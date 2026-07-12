import { createHash } from 'crypto';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../db/prisma.service';

// `jose` (used by AuthService for signJwt/verifyJwt) is ESM-only and has
// no CommonJS build, which breaks Jest's default CJS transform as soon as
// AuthService is imported. These tests never exercise signJwt/verifyJwt,
// so `jose` is mocked out entirely rather than reconfiguring Jest for ESM
// repo-wide. Mirrors the existing StellarService mock in
// app.controller.spec.ts.
jest.mock('jose', () => ({
  SignJWT: jest.fn().mockImplementation(() => ({
    setProtectedHeader: jest.fn().mockReturnThis(),
    setIssuedAt: jest.fn().mockReturnThis(),
    setExpirationTime: jest.fn().mockReturnThis(),
    sign: jest.fn().mockResolvedValue('mock.jwt.token'),
  })),
  jwtVerify: jest.fn(),
}));

// createPasswordResetToken / hashResetToken never touch the DB, but
// AuthService's constructor calls getAuthConfig(process.env) as a field
// initializer, so its zod schema must validate before the provider can be
// instantiated at all. WEB_ORIGIN mirrors the default used in main.ts.
process.env.AUTH_JWT_SECRET ??= 'test-secret-value';
process.env.WEB_ORIGIN ??= 'http://localhost:3000';

describe('AuthService - token helpers', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('createPasswordResetToken', () => {
    it('returns a token and a tokenHash', () => {
      const result = service.createPasswordResetToken();

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('tokenHash');
      expect(typeof result.token).toBe('string');
      expect(typeof result.tokenHash).toBe('string');
    });

    it('returns a 64-char hex token (32 random bytes)', () => {
      const { token } = service.createPasswordResetToken();

      expect(token).toMatch(/^[0-9a-f]{64}$/);
    });

    it('returns a 64-char hex tokenHash (sha256 digest)', () => {
      const { tokenHash } = service.createPasswordResetToken();

      expect(tokenHash).toMatch(/^[0-9a-f]{64}$/);
    });

    it('returns a tokenHash that is the sha256 hash of the token', () => {
      const { token, tokenHash } = service.createPasswordResetToken();
      const expectedHash = createHash('sha256').update(token).digest('hex');

      expect(tokenHash).toBe(expectedHash);
    });

    it('generates a different token on each call', () => {
      const first = service.createPasswordResetToken();
      const second = service.createPasswordResetToken();

      expect(first.token).not.toBe(second.token);
      expect(first.tokenHash).not.toBe(second.tokenHash);
    });
  });

  describe('hashResetToken', () => {
    it('is deterministic for the same input', () => {
      const token = 'a'.repeat(64);

      expect(service.hashResetToken(token)).toBe(
        service.hashResetToken(token),
      );
    });

    it('matches a manually computed sha256 hex digest', () => {
      const token = 'known-reset-token-value';
      const expected = createHash('sha256').update(token).digest('hex');

      expect(service.hashResetToken(token)).toBe(expected);
    });

    it('produces different hashes for different inputs', () => {
      const hashA = service.hashResetToken('token-a');
      const hashB = service.hashResetToken('token-b');

      expect(hashA).not.toBe(hashB);
    });

    it('returns a 64-char hex string', () => {
      const hash = service.hashResetToken('some-token');

      expect(hash).toMatch(/^[0-9a-f]{64}$/);
    });

    it('matches the hash produced by createPasswordResetToken for its own token', () => {
      const { token, tokenHash } = service.createPasswordResetToken();

      expect(service.hashResetToken(token)).toBe(tokenHash);
    });
  });
});