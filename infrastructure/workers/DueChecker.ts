import { IDueChecker } from "#domain/repositories/IDueChecker.js";
import { ITaskRepository } from "#domain/repositories/ITaskRepository.js";
import { logger } from "#infrastructure/config/adapters/logger/logger.js";
import { redis } from "#infrastructure/config/adapters/redis/redisClient.js";
import { Task } from "@prisma/client";

export class DueChecker implements IDueChecker {
    constructor(private readonly taskRepo: ITaskRepository) {}

    async checkTask(task: Task): Promise<void> {
        if (!task.dueDate) return;

        const now = new Date();
        const next24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const due = new Date(task.dueDate);

        if (due >= now && due <= next24h) {
            logger.log('cron', `Task ${task.id} due in less than 24h`);

            await redis.rpush('due-tasks', JSON.stringify({ taskId: task.id, dueDate: task.dueDate }));
        }
    }

    async dueChecker(): Promise<void> {
        const tasks = await this.taskRepo.getAll({});
        if (!tasks) return;

        for (const task of tasks) {
            await this.checkTask(task);
        }
    }
}
