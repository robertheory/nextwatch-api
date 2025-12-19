FROM node:22.17.1-slim AS base

ENV NODE_ENV=development
WORKDIR /usr/src/app

RUN apt-get update \
	&& apt-get install --no-install-recommends -y dumb-init openssl curl ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

FROM base AS deps

COPY package*.json ./

# Include dev deps for tooling like Nest CLI and Prisma in the container.
RUN npm install --include=dev

FROM base AS dev

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY . .

# Copy entrypoint and ensure permissions
COPY docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh
RUN chmod +x /usr/src/app/docker-entrypoint.sh
# copy a stable entrypoint outside the app volume so mounts won't hide it
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN groupadd -g 1001 nodeapp \
	&& useradd -u 1001 -g nodeapp -m nodeapp \
	&& chown -R nodeapp:nodeapp /usr/src/app

USER nodeapp

ENTRYPOINT ["dumb-init", "/usr/local/bin/docker-entrypoint.sh"]

EXPOSE 3333

CMD ["npm", "run", "start:dev"]

# Healthcheck: probe the application /health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
	CMD curl -f http://127.0.0.1:3333/health || exit 1
