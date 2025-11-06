import { Elysia } from "elysia";
import dotenv from "dotenv";
import { taskRoutes } from "../../infrastructure/http/routes/TaskRoutes.js";
import { logger } from "#infrastructure/config/adapters/logger/logger.js";
import node from "@elysiajs/node";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;

const app = new Elysia({ adapter: node() })
	.get('/', () => 'Hello Elysia')
	.listen(PORT, ({ hostname, port }) => {
		logger.info(
			`🦊 Elysia is running at ${hostname}:${port}`
		)
	})

taskRoutes(app);

