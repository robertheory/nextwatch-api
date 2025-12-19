#!/bin/sh
set -e

echo "==> Running Prisma generate"
npx prisma generate

echo "==> Applying Prisma migrations (deploy)"
# Non-interactive migrations - suitable for CI/CD and containers
npx prisma migrate deploy

echo "==> Migrations applied, starting the app"
exec "$@"
