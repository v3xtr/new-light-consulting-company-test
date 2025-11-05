import { Task } from "@prisma/client"

export interface ITaskController{
    uploadTask(body: unknown): Promise<Task>
    getTasks(body: unknown): Promise<Task[] | null>
    getTaskById(body: unknown): Promise<Task | null>
    updateTask(id: unknown, body: unknown): Promise<Task>
    deleteTask(body: unknown): Promise<Task>
}
