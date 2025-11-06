FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json bun.lock ./

RUN bun install --production

COPY . .

RUN bun prisma generate

RUN bun tsup

RUN apt-get update -y && apt-get install -y openssl

EXPOSE 8000

CMD ["sh", "-c", "bun prisma migrate deploy && bun run start"]
