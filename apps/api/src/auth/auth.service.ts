import { Injectable } from "@nestjs/common";
import { PrismaService } from "../db/prisma.service";
import { SignJWT, jwtVerify } from "jose";
import { getAuthConfig } from "./auth.config";
import type { AuthUser } from "./auth.types";
import bcrypt from "bcryptjs";
import { randomBytes, createHash } from "crypto";

const signUpSchema = {
  email: (email: string) => email.trim().toLowerCase(),
};

@Injectable()
export class AuthService {
  private readonly config = getAuthConfig(process.env);
  private readonly secret = new TextEncoder().encode(this.config.AUTH_JWT_SECRET);

  constructor(private readonly prisma: PrismaService) {}

  async signJwt(user: AuthUser) {
    return new SignJWT({
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      provider: user.provider,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(this.secret);
  }

  async verifyJwt(token: string): Promise<AuthUser | null> {
    try {
      const { payload } = await jwtVerify(token, this.secret);
      if (!payload.sub || typeof payload.email !== "string") return null;
      return {
        id: String(payload.sub),
        email: payload.email,
        fullName: typeof payload.fullName === "string" ? payload.fullName : null,
        provider:
          payload.provider === "GOOGLE" || payload.provider === "EMAIL"
            ? payload.provider
            : "EMAIL",
      };
    } catch {
      return null;
    }
  }

  async signUpWithEmail(params: {
    email: string;
    password: string;
    fullName?: string;
  }) {
    const email = signUpSchema.email(params.email);
    const passwordHash = await bcrypt.hash(params.password, 12);
    return this.prisma.user.create({
      data: {
        email,
        fullName: params.fullName?.trim() || null,
        passwordHash,
        provider: "EMAIL",
      },
      select: { id: true, email: true, fullName: true, provider: true },
    });
  }

  async signInWithEmail(params: { email: string; password: string }) {
    const email = signUpSchema.email(params.email);
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user?.passwordHash) return null;
    const ok = await bcrypt.compare(params.password, user.passwordHash);
    if (!ok) return null;
    return { id: user.id, email: user.email, fullName: user.fullName, provider: user.provider };
  }

  async createOrLinkGoogleUser(params: { email: string; fullName?: string; googleSub: string }) {
    const email = signUpSchema.email(params.email);
    const existingBySub = await this.prisma.user.findUnique({ where: { googleSub: params.googleSub } });
    if (existingBySub) {
      return { id: existingBySub.id, email: existingBySub.email, fullName: existingBySub.fullName, provider: existingBySub.provider };
    }

    const existingByEmail = await this.prisma.user.findUnique({ where: { email } });
    if (existingByEmail) {
      const updated = await this.prisma.user.update({
        where: { id: existingByEmail.id },
        data: { googleSub: params.googleSub, provider: "GOOGLE" },
        select: { id: true, email: true, fullName: true, provider: true },
      });
      return updated;
    }

    return this.prisma.user.create({
      data: {
        email,
        fullName: params.fullName?.trim() || null,
        provider: "GOOGLE",
        googleSub: params.googleSub,
      },
      select: { id: true, email: true, fullName: true, provider: true },
    });
  }

  createPasswordResetToken() {
    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    return { token, tokenHash };
  }

  hashResetToken(token: string) {
    return createHash("sha256").update(token).digest("hex");
  }
}

