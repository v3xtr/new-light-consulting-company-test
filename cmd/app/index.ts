import { Elysia } from "elysia";
import dotenv from 'dotenv'
import { taskRoutes } from "../../infrastructure/http/routes/TaskRoutes";

dotenv.config()


const app = new Elysia().listen(process.env.PORT as string);

taskRoutes(app)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
