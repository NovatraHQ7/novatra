# `@novatra/stellar` architecture

This package is the “contract/settlement” foundation for Novatra’s Stellar integration.

## What belongs here

- Stellar config + network selection
- Horizon client creation
- Transaction building helpers (payments first, then swaps/path payments)
- Memo formats, idempotency helpers
- Corridor definitions (e.g. `uk-ng`)

## What does *not* belong here

- Business rules (fees, FX spreads, compliance decisions)
- Database access
- Payout integrations (bank/mobile money)

Those stay in `apps/api`.

## Modules

- `src/config.ts`: reads `NOVATRA_STELLAR_NETWORK`, `NOVATRA_HORIZON_URL`
- `src/client.ts`: creates `Horizon.Server` + selects passphrase
- `src/payments.ts`: build + submit payment tx primitives
- `src/corridors.ts`: corridor registry

