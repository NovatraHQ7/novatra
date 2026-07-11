import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import type { RequestHandler } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cookieParserMiddleware =
    cookieParser as unknown as () => RequestHandler;
  app.use(cookieParserMiddleware());

  const webOrigin = process.env.WEB_ORIGIN ?? 'http://localhost:3000';
  app.enableCors({
    origin: webOrigin,
    credentials: true,
  });

  await app.listen(Number(process.env.PORT) || 3001);
}
void bootstrap();
