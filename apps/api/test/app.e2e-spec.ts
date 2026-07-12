import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});

describe('Auth session cookies (e2e)', () => {
  let app: INestApplication<App>;
  const cookieName = process.env.AUTH_COOKIE_NAME || 'nv_session';

  beforeAll(() => {
    // Ensure required auth env vars exist even if the local .env isn't
    // loaded in the test process; real CI should set these for real.
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

  function extractCookie(res: request.Response, name: string) {
    const raw = res.headers['set-cookie'];
    const cookies: string[] = Array.isArray(raw) ? raw : raw ? [raw] : [];
    return cookies.find((c) => c.startsWith(`${name}=`));
  }

  it('sets a session cookie on sign-up', async () => {
    const email = `e2e-signup-${Date.now()}@example.com`;
    const res = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email, password: 'correct-horse-battery' })
      .expect(201);

    const cookie = extractCookie(res, cookieName);
    expect(cookie).toBeDefined();
    expect(cookie).toContain('HttpOnly');
  });

  it('sets a session cookie on sign-in with valid credentials', async () => {
    const email = `e2e-signin-${Date.now()}@example.com`;
    const password = 'correct-horse-battery';

    await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email, password })
      .expect(201);

    const res = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({ email, password })
      .expect(200);

    const cookie = extractCookie(res, cookieName);
    expect(cookie).toBeDefined();
  });

  it('does not set a session cookie on failed sign-in', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({ email: 'no-such-user@example.com', password: 'whatever123' })
      .expect(401);

    const cookie = extractCookie(res, cookieName);
    expect(cookie).toBeUndefined();
  });

  it('clears the session cookie on sign-out', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/sign-out')
      .expect(200);

    const cookie = extractCookie(res, cookieName);
    expect(cookie).toBeDefined();
    // Clearing a cookie means sending it back expired / zero max-age,
    // not omitting the Set-Cookie header entirely.
    expect(cookie).toMatch(/Expires=Thu, 01 Jan 1970|Max-Age=0/);
  });
});