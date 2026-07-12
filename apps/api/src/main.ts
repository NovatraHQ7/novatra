import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import type { RequestHandler } from 'express';
import { AuthConfigError, getAuthConfig } from './auth/auth.config';

function validateEnvOrExit() {
  try {
    return getAuthConfig(process.env);
  } catch (err) {
    if (err instanceof AuthConfigError) {
      // eslint-disable-next-line no-console
      console.error(`[bootstrap] ${err.message}`);
      process.exit(1);
    }
    throw err;
  }
}

async function bootstrap() {
  // Fail fast: validate required auth env vars before we spend time
  // building the Nest app. A misconfigured deploy should never come up
  // "successfully" with broken auth.
  const authConfig = validateEnvOrExit();

  const app = await NestFactory.create(AppModule);
  const cookieParserMiddleware =
    cookieParser as unknown as () => RequestHandler;
  app.use(cookieParserMiddleware());

  app.enableCors({
    origin: authConfig.WEB_ORIGIN,
    credentials: true,
  });

  await app.listen(Number(process.env.PORT) || 3001);
}
void bootstrap();