import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import type { Request, Response } from "express";
import { z } from "zod";
import { AuthService } from "./auth.service";
import { getAuthConfig } from "./auth.config";
import { PrismaService } from "../db/prisma.service";
import { EmailService } from "../email/email.service";
import { GoogleAuthGuard } from "./google.guard";
import { UseGuards } from "@nestjs/common";

const signUpDto = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2).optional(),
});

const signInDto = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const forgotDto = z.object({
  email: z.string().email(),
});

const resetDto = z.object({
  token: z.string().min(10),
  newPassword: z.string().min(8),
});

@Controller("auth")
export class AuthController {
  private readonly config = getAuthConfig(process.env);

  constructor(
    private readonly auth: AuthService,
    private readonly prisma: PrismaService,
    private readonly email: EmailService
  ) {}

  private setSessionCookie(res: Response, jwt: string) {
    res.cookie(this.config.AUTH_COOKIE_NAME, jwt, {
      httpOnly: true,
      sameSite: "lax",
      secure: this.config.AUTH_COOKIE_SECURE === "true",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  @Post("sign-up")
  async signUp(@Body() body: unknown, @Res({ passthrough: true }) res: Response) {
    const dto = signUpDto.parse(body);
    const created = await this.auth.signUpWithEmail(dto);
    const jwt = await this.auth.signJwt({
      id: created.id,
      email: created.email,
      fullName: created.fullName,
      provider: created.provider,
    });
    this.setSessionCookie(res, jwt);
    return { user: created };
  }

  @Post("sign-in")
  async signIn(@Body() body: unknown, @Res({ passthrough: true }) res: Response) {
    const dto = signInDto.parse(body);
    const user = await this.auth.signInWithEmail(dto);
    if (!user) throw new UnauthorizedException("Invalid credentials");
    const jwt = await this.auth.signJwt({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      provider: user.provider,
    });
    this.setSessionCookie(res, jwt);
    return { user };
  }

  @Post("sign-out")
  async signOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(this.config.AUTH_COOKIE_NAME, { path: "/" });
    return { ok: true };
  }

  @Get("me")
  async me(@Req() req: Request) {
    const token = (req as any).cookies?.[this.config.AUTH_COOKIE_NAME] as string | undefined;
    if (!token) throw new UnauthorizedException();
    const user = await this.auth.verifyJwt(token);
    if (!user) throw new UnauthorizedException();
    return { user };
  }

  @Post("forgot-password")
  async forgotPassword(@Body() body: unknown) {
    const dto = forgotDto.parse(body);
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    // Always return ok to avoid user enumeration
    if (!user) return { ok: true };

    const { token, tokenHash } = this.auth.createPasswordResetToken();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    await this.prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });

    const baseUrl = this.config.WEB_BASE_URL;
    const url = `${baseUrl}/auth/reset-password?token=${encodeURIComponent(token)}`;
    await this.email.sendPasswordReset({ to: user.email, url });

    return { ok: true };
  }

  @Post("reset-password")
  async resetPassword(@Body() body: unknown) {
    const dto = resetDto.parse(body);
    const tokenHash = this.auth.hashResetToken(dto.token);

    const rec = await this.prisma.passwordResetToken.findFirst({
      where: { tokenHash, usedAt: null, expiresAt: { gt: new Date() } },
      include: { user: true },
    });
    if (!rec) throw new UnauthorizedException("Invalid or expired token");

    const passwordHash = await import("bcryptjs").then((m) => m.default.hash(dto.newPassword, 12));
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: rec.userId }, data: { passwordHash, provider: "EMAIL" } }),
      this.prisma.passwordResetToken.update({ where: { id: rec.id }, data: { usedAt: new Date() } }),
    ]);

    return { ok: true };
  }

  @Get("google/start")
  @UseGuards(GoogleAuthGuard)
  async googleStart() {
    // passport redirect
    return;
  }

  @Get("google/callback")
  @UseGuards(GoogleAuthGuard)
  async googleCallback(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const profile = (req as any).user as
      | { email: string; fullName?: string; googleSub: string }
      | undefined;
    if (!profile) throw new UnauthorizedException("Google auth failed");

    const user = await this.auth.createOrLinkGoogleUser(profile);
    const jwt = await this.auth.signJwt({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      provider: user.provider,
    });
    this.setSessionCookie(res, jwt);

    return res.redirect(`${this.config.WEB_BASE_URL}/dashboard`);
  }
}
