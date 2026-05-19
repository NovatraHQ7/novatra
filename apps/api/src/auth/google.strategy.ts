import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";

type GoogleProfile = {
  id: string;
  displayName?: string;
  name?: { givenName?: string; familyName?: string };
  emails?: Array<{ value: string }>;
};

export function isGoogleOauthConfigured(env = process.env) {
  return Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET);
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor() {
    const clientID = process.env.GOOGLE_CLIENT_ID || "disabled";
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "disabled";
    const callbackURL =
      process.env.GOOGLE_CALLBACK_URL ||
      "http://localhost:3001/auth/google/callback";
    super({
      clientID,
      clientSecret,
      callbackURL,
      scope: ["email", "profile"],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: GoogleProfile,
    done: (err: any, user?: any) => void
  ) {
    const email = profile.emails?.[0]?.value;
    if (!email) return done(new Error("Google profile missing email"));

    const fullName =
      profile.displayName ||
      [profile.name?.givenName, profile.name?.familyName]
        .filter(Boolean)
        .join(" ")
        .trim() ||
      undefined;

    done(null, { email, fullName, googleSub: profile.id });
  }
}
