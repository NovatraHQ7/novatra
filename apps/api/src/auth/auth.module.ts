import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { EmailModule } from "../email/email.module";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./google.strategy";

@Module({
  imports: [EmailModule, PassportModule.register({ session: false })],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
