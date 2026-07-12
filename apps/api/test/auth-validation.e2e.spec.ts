import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Auth payload validation (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(() => {
    process.env.AUTH_JWT_SECRET ??= 'test-only-secret-please-override-in-ci';
    process.env.WEB_ORIGIN ??= 'http://localhost:3000';
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /auth/sign-up', () => {
    it('rejects a malformed email', () => {
      return request(app.getHttpServer())
        .post('/auth/sign-up')
        .send({ email: 'not-an-email', password: 'validpassword123' })
        .expect(400);
    });

    it('rejects a password below the minimum length', () => {
      return request(app.getHttpServer())
        .post('/auth/sign-up')
        .send({
          email: `short-pw-${Date.now()}@example.com`,
          password: '123',
        })
        .expect(400);
    });

    it('rejects a missing password', () => {
      return request(app.getHttpServer())
        .post('/auth/sign-up')
        .send({ email: `no-pw-${Date.now()}@example.com` })
        .expect(400);
    });
  });

  describe('POST /auth/sign-in', () => {
    it('rejects a malformed email', () => {
      return request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ email: 'nope', password: 'whatever123' })
        .expect(400);
    });

    it('rejects an empty password', () => {
      return request(app.getHttpServer())
        .post('/auth/sign-in')
        .send({ email: 'someone@example.com', password: '' })
        .expect(400);
    });
  });

  describe('POST /auth/reset-password', () => {
    it('rejects an invalid token shape', () => {
      return request(app.getHttpServer())
        .post('/auth/reset-password')
        .send({ token: 'short', newPassword: 'validpassword123' })
        .expect(400);
    });

    it('rejects a new password below the minimum length', () => {
      return request(app.getHttpServer())
        .post('/auth/reset-password')
        .send({ token: 'a'.repeat(40), newPassword: '123' })
        .expect(400);
    });
  });

  describe('POST /auth/reset-password/request', () => {
    it('rejects a malformed email', () => {
      return request(app.getHttpServer())
        .post('/auth/reset-password/request')
        .send({ email: 'not-an-email' })
        .expect(400);
    });
  });
});