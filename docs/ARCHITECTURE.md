# Architecture (MVP)

## Apps

- `apps/web`: sender UX (signup → KYC → quote → pay → track)
- `apps/mobile`: recipient + sender (phase 2 / parity)
- `apps/api`: REST API + background jobs

## Packages

- `packages/shared`: shared DTOs + validation + money utils
- `packages/stellar`: Stellar settlement primitives (SDK wrappers)

## MVP flow (UK → Nigeria example)

1. Sender requests quote (amount + corridor)
2. API returns quote (fx rate, fees, payout amount, expiry)
3. Sender confirms and pays (fiat rail / stablecoin deposit)
4. API creates transfer, runs compliance checks
5. API settles via Stellar (stablecoin movement)
6. API triggers local payout (bank/mobile money) and updates status

