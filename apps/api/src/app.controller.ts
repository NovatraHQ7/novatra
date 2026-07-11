import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { StellarService } from './stellar/stellar.service';
import { PrismaService } from './db/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly stellarService: StellarService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/corridors')
  listCorridors() {
    return this.stellarService.listCorridors();
  }
  @Get('/health')
  async health() {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;
      return {
        status: 'ok',
        database: 'connected',
      };
    } catch {
      return {
        status: 'degraded',
        database: 'not connected',
      };
    }
  }
}
