# Novatra API (`apps/api`)

Backend API for Novatra’s remittance MVP.

## Local setup

1. Copy environment variables:

```bash
cp apps/api/.env.example apps/api/.env
```

2. Start local Postgres from repo root:

```bash
docker compose up -d
```

3. Run migrations:

```bash
pnpm --filter api prisma:migrate
```

4. Start API in watch mode:

```bash
pnpm --filter api dev
```

## What this app is

NestJS service that will handle:

- authentication + sessions (MVP)
- KYC/AML hooks (MVP: basic)
- quotes (fees + FX + expiry)
- transfers (create → process → status updates)
- settlement orchestration (via Stellar)
- payout orchestration (bank/mobile money integrations later)

## “Contracts/Settlement” integration

This API consumes the settlement foundation in `packages/stellar` (`@novatra/stellar`).

Starter endpoint:

- `GET /corridors` — returns supported corridors from `@novatra/stellar`

Auth endpoints:

- `POST /auth/sign-up`
- `POST /auth/sign-in`
- `POST /auth/sign-out`
- `GET /auth/me`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /auth/google/start`
- `GET /auth/google/callback`

Default local port: `3001` (see `apps/api/.env.example`).
