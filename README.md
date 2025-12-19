# NextWatch API (Backend)

Backend service for the NextWatch application. Built with NestJS and TypeScript; it exposes endpoints to manage shows and watched episodes and integrates with a PostgreSQL database via Prisma ORM.

## Quick overview

- Framework: NestJS
- ORM: Prisma
- Database: PostgreSQL
- Default API port: 3333

## Prerequisites

- Node.js 18+ (recommended)
- Yarn (or npm / pnpm)
- Docker & Docker Compose (recommended for running the full stack)

## Environment

Copy the example env and update values for your environment:

```bash
cp .env.example .env
# edit .env (DATABASE_URL, PORT, etc.)
```

Important variables:

- `DATABASE_URL` — Postgres connection string used by Prisma
- `PORT` — port to run the API (defaults to 3333)

## Install dependencies

```bash
yarn install
# or: npm install
```

## Prisma: generate client and run migrations

Generate Prisma client:

```bash
npx prisma generate
```

Apply development migrations (creates DB objects and updates the client):

```bash
npx prisma migrate dev
```

If you run the database inside Docker, ensure the DB container is healthy before running migrations.

## Run the API

Development (hot reload):

```bash
yarn start:dev
```

Production build and run:

```bash
yarn build
yarn start:prod
```

The server will be available at `http://localhost:3333` unless `PORT` is changed.

## Run with Docker Compose

From the repository root you can bring up the whole stack (frontend, backend, database) with:

```bash
docker compose up --build
```

To run only the backend service defined in the Compose file:

```bash
docker compose up --build nextwatch-api
```

To stop and remove containers and volumes:

```bash
docker compose down -v
```

## Tests

Run unit tests:

```bash
yarn test
```

Run e2e tests:

```bash
yarn test:e2e
```

Show test coverage:

```bash
yarn test:cov
```

## Useful developer commands

- Open Prisma Studio: `npx prisma studio`
- Reset database (development): `npx prisma migrate reset` (careful: drops data)

## API examples

The `api.http` file in this directory contains example requests to the local API (shows, episodes). Use it with VSCode REST Client, HTTPie, Insomnia or Postman.

## Deployment notes

When deploying to production:

- Provide a managed Postgres instance and set `DATABASE_URL` accordingly.
- Ensure migrations are applied before or during deployment (CI step).
- Store secrets (like `DATABASE_URL`) securely (secrets manager, environment variables).

## Resources

- NestJS: https://docs.nestjs.com
- Prisma: https://www.prisma.io/docs
- TVMaze API: https://www.tvmaze.com/api

If you want, I can add a `docker-compose.ci.yml` or GitHub Actions workflow that runs migrations and tests on PRs.

