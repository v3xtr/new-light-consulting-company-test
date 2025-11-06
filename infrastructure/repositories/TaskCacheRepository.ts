import { ITaskCacheRepository } from "#domain/repositories/ITaskCacheRepository.js";
import { redis } from "#infrastructure/config/adapters/redis/redisClient.js";

export class TaskCacheRepository implements ITaskCacheRepository{
    async enqueueTaskService(taskId: string, message: string): Promise<number> {
        return await redis.lpush("task_notification", JSON.stringify({ taskId, message }))
    }
}
