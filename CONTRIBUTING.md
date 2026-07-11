# Contributing to Novatra

Thanks for helping improve Novatra.

## Before you start

- Read the architecture notes in docs/ARCHITECTURE.md.
- Check GitHub Issues for starter tasks (look for `good first issue`).
- Open an issue before large feature work to align on scope.

## Local setup

1. Install prerequisites:

- Node.js 22+
- pnpm 9+
- Docker (for local Postgres)

Optional: use `pnpm bootstrap` from repo root to run setup in one command.

2. Install dependencies:

```bash
pnpm install
```

3. Start Postgres:

```bash
docker compose up -d
```

4. Configure API env:

```bash
cp apps/api/.env.example apps/api/.env
```

5. Apply DB migrations:

```bash
pnpm --filter api prisma:migrate
```

6. Start apps:

```bash
pnpm dev
```

## Branch and commit conventions

- Branch naming: feat/<short-name>, fix/<short-name>, docs/<short-name>
- Keep PRs focused and small enough to review.
- Use clear commit messages describing intent.

## Quality checks

Run these before opening a PR:

```bash
pnpm lint
pnpm typecheck
pnpm test
```

If your change affects only one app/package, run scoped commands where possible.

## Pull request checklist

- Linked issue or clear problem statement
- Tests added or updated where practical
- Docs updated if behavior changed
- No unrelated refactors included

## Review expectations

Maintainers will prioritize correctness, security, and API stability.

You may be asked to:

- split large PRs
- add tests for edge cases
- document migration or env changes
