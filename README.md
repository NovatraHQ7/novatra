# Novatra Monorepo

Novatra is a remittance-focused monorepo built for open collaboration.

## Workspace layout

- `apps/web` - Next.js sender-facing frontend
- `apps/api` - NestJS backend API
- `apps/mobile` - Expo React Native mobile app
- `packages/shared` - shared types and utilities
- `packages/stellar` - Stellar settlement primitives

## Requirements

- Node.js 22+
- pnpm 9+
- Docker (for local Postgres)

Use `.nvmrc` if you use nvm:

```bash
nvm use
```

If you use Volta, tool versions are pinned in `package.json`.

## Quick start

Fast path:

```bash
pnpm bootstrap
```

Manual path:

1. Install dependencies:

```bash
pnpm install
```

2. Start local Postgres:

```bash
docker compose up -d
```

3. Configure API environment:

```bash
cp apps/api/.env.example apps/api/.env
```

4. Run migrations:

```bash
pnpm --filter api prisma:migrate
```

5. Start web + api:

```bash
pnpm dev
```

## Common scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
```

## New contributor floor

1. Create and switch to a branch:

```bash
git checkout -b feat/short-name
```

2. Pick a starter issue from GitHub Issues (look for `good first issue` label).

3. Make your changes and run checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
```

4. Open a PR and complete `.github/pull_request_template.md`.

For full contribution expectations and conventions, see `CONTRIBUTING.md`.

## Open source and community

- Contribution guide: `CONTRIBUTING.md`
- Code of conduct: `CODE_OF_CONDUCT.md`
- Security policy: `SECURITY.md`
- Good first tasks: GitHub Issues with `good first issue` label

## License

MIT. See `LICENSE`.
