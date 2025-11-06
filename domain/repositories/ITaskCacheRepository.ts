export interface ITaskCacheRepository{
    enqueueTaskService(taskId: string, message: string): Promise<number>
}
