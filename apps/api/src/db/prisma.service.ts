import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    const maxAttempts = Number(process.env.PRISMA_CONNECT_RETRIES ?? 10);
    const retryDelayMs = Number(
      process.env.PRISMA_CONNECT_RETRY_DELAY_MS ?? 3000,
    );

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        await this.$connect();
        this.logger.log('Prisma connected');
        return;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const isLastAttempt = attempt === maxAttempts;

        this.logger.error(
          `Prisma connect failed (attempt ${attempt}/${maxAttempts}): ${message}`,
        );

        if (isLastAttempt) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
