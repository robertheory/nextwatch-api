FROM node:22.17.1-slim AS base

ENV NODE_ENV=development
WORKDIR /usr/src/app

RUN apt-get update \
	&& apt-get install --no-install-recommends -y dumb-init openssl \
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

RUN groupadd -g 1001 nodeapp \
	&& useradd -u 1001 -g nodeapp -m nodeapp \
	&& chown -R nodeapp:nodeapp /usr/src/app

USER nodeapp

ENTRYPOINT ["dumb-init", "/usr/src/app/docker-entrypoint.sh"]

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
