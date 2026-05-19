import { z } from "zod";

const schema = z.object({
  AUTH_JWT_SECRET: z.string().min(16),
  AUTH_COOKIE_NAME: z.string().min(1).default("nv_session"),
  AUTH_COOKIE_SECURE: z
    .union([z.literal("true"), z.literal("false")])
    .default("false"),
  WEB_ORIGIN: z.string().url(),
  WEB_BASE_URL: z.string().url().default("http://localhost:3000"),
});

export type AuthConfig = z.infer<typeof schema> & {
  AUTH_COOKIE_SECURE: "true" | "false";
};

export function getAuthConfig(env = process.env): AuthConfig {
  const parsed = schema.safeParse(env);
  if (!parsed.success) {
    throw new Error(`Invalid auth env: ${parsed.error.message}`);
  }
  return parsed.data;
}

