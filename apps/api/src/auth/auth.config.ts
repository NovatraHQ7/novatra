import { z } from 'zod';

const schema = z.object({
  AUTH_JWT_SECRET: z.string().min(16, 'must be at least 16 characters'),
  AUTH_COOKIE_NAME: z.string().min(1).default('nv_session'),
  AUTH_COOKIE_SECURE: z
    .union([z.literal('true'), z.literal('false')])
    .default('false'),
  WEB_ORIGIN: z.string().url(),
  WEB_BASE_URL: z.string().url().default('http://localhost:3000'),
});

export type AuthConfig = z.infer<typeof schema> & {
  AUTH_COOKIE_SECURE: 'true' | 'false';
};

/**
 * Thrown when required auth environment variables are missing or invalid.
 * Kept as a distinct class so callers (e.g. bootstrap) can catch it
 * specifically and exit cleanly instead of surfacing a raw stack trace.
 */
export class AuthConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthConfigError';
  }
}

export function getAuthConfig(env = process.env): AuthConfig {
  const parsed = schema.safeParse(env);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map(
        (issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`,
      )
      .join('\n');
    throw new AuthConfigError(
      `Invalid auth environment configuration:\n${details}`,
    );
  }
  return parsed.data;
}