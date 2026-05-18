# Novatra API (`apps/api`)

Backend API for Novatra’s remittance MVP.

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

Default local port: `3001` (see `apps/api/.env.example`).

