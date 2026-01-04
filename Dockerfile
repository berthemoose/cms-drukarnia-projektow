FROM node:22-bookworm-slim AS base

FROM base AS builder
WORKDIR /home/node/app


COPY package*.json ./
RUN npm install


COPY . .

RUN npm run build

FROM base AS runtime
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /home/node/app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]