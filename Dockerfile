FROM node:20-alpine AS build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .
RUN pnpm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./
COPY --from=build /app/knexfile.js ./
COPY --from=build /app/dist ./dist

RUN npm install -g pnpm
RUN pnpm install --prod
ENV NODE_ENV=production

EXPOSE 3000

CMD ["sh", "-c", "pnpm migrate:up && node dist/index.js"]
