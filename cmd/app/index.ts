import { Elysia } from "elysia";
import dotenv from "dotenv";
import { taskRoutes } from "../../infrastructure/http/routes/TaskRoutes.js";
import { logger } from "#infrastructure/config/adapters/logger/logger.js";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

const app = new Elysia();

taskRoutes(app);

app.listen({ port: PORT });

logger.info(`🦊 Elysia is running at http://localhost:${PORT}`);
