#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "==> Checking toolchain"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Please install Node.js 22+ first."
  exit 1
fi

if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is not installed. Please install pnpm 9+ first."
  exit 1
fi

NODE_MAJOR="$(node -v | sed 's/^v//' | cut -d. -f1)"
if [ "$NODE_MAJOR" -lt 22 ]; then
  echo "Node.js 22+ is required. Current: $(node -v)"
  exit 1
fi

echo "==> Installing dependencies"
pnpm install

if [ ! -f apps/api/.env ]; then
  echo "==> Creating apps/api/.env from template"
  cp apps/api/.env.example apps/api/.env
fi

echo "==> Generating Prisma client"
pnpm --filter api prisma:generate

if command -v docker >/dev/null 2>&1; then
  echo "==> Attempting to start local Postgres (docker compose up -d)"
  if ! docker compose up -d; then
    echo "Could not start Docker services automatically. You can retry later with: docker compose up -d"
  fi
else
  echo "Docker not found. Start Postgres manually if you need database-backed API flows."
fi

echo "==> Bootstrap complete"
echo "Next steps:"
echo "  1) pnpm --filter api prisma:migrate"
echo "  2) pnpm dev"
