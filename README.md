# Elysia Project with Bun Runtime

A modern web application built with **Elysia** and **Bun**, ready for local development and Docker deployment.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Docker Setup](#docker-setup)
- [Migrations](#migrations)
- [Contributing](#contributing)

---

## Getting Started

To create a new project using this template:

```bash
bun create elysia ./elysia-project
cd elysia-project

Install dependencies:

bun install

Environment Variables

Copy the example .env.example to .env:

cp .env.example .env
```
⚠️ Important: Update the variables in .env to match your local setup or production credentials:

```bash
PORT=8000
DATABASE_URL="postgresql://postgres:postgres@db:5432/elysia_db"
REDIS_HOST=redis
REDIS_PORT=6379
NODE_ENV=development
```
Make sure to never commit your real .env file to Git.

Development

Run the development server locally:

```bash
bun run dev

Open http://localhost:8000
```
in your postman.
Docker Setup

Start the app along with PostgreSQL and Redis using Docker Compose:

docker-compose up --build

This will start:

    app — Elysia application

    db — PostgreSQL database

    redis — Redis cache

The application will automatically apply Prisma migrations on startup.
Migrations

Generate Prisma client after modifying the schema:

```bash
bun prisma generate
```

Apply migrations locally (development mode):

```bash
bun prisma migrate dev
```

In Docker, migrations are applied automatically at container startup using:

```bash
bun prisma migrate deploy
```

Contributing

Fork the repository.

Create a feature branch: git checkout -b feature/my-feature.

Commit your changes: git commit -m "Add feature".

Push to the branch: git push origin feature/my-feature.

Open a Pull Request.
