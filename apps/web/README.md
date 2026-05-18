# Novatra Web (`apps/web`)

Sender-first web frontend for Novatra.

## What this app is

A modern fintech UI that lets diaspora users:

- create an account and complete onboarding/KYC (MVP scope)
- get a transfer quote (fees + FX + ETA)
- send money and track transfer status

## What we’re building (MVP)

Primary corridor example: **UK → Nigeria**.

Core screens (initial):

- onboarding (account + basic verification)
- beneficiary (recipient) management
- quote → confirm → status tracking

## How it connects

- Talks to the API in `apps/api` (default local API: `http://localhost:3001`).
- Uses shared types/DTOs from `@novatra/shared` as they evolve.

