import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StellarService } from './stellar/stellar.service';
import { PrismaService } from './db/prisma.service';

jest.mock('./stellar/stellar.service', () => ({
  StellarService: class StellarService {
    listCorridors() {
      return [];
    }
  },
}));

describe('AppController', () => {
  let appController: AppController;
  let queryRaw: jest.Mock;

  beforeEach(async () => {
    queryRaw = jest.fn();

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: StellarService,
          useValue: {
            listCorridors: jest.fn().mockReturnValue([]),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            $queryRaw: queryRaw,
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('health', () => {
    it('reports ok when the database responds', async () => {
      queryRaw.mockResolvedValueOnce([{ '?column?': 1 }]);

      const result = await appController.health();

      expect(result.ok).toBe(true);
      expect(result.database).toBe('connected');
      expect(typeof result.timestamp).toBe('string');
    });

    it('reports degraded when the database query fails', async () => {
      queryRaw.mockRejectedValueOnce(new Error('connection refused'));

      const result = await appController.health();

      expect(result.ok).toBe(false);
      expect(result.database).toBe('unavailable');
    });
  });
});
