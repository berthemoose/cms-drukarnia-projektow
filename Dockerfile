FROM node:22-bookworm-slim AS base

FROM base AS builder
WORKDIR /app


COPY package*.json ./
RUN npm install


COPY . .

RUN npm run build

FROM base AS runtime
ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]