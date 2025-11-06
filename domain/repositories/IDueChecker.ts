import { Task } from "@prisma/client";

export interface IDueChecker{
    checkTask(task: Task): Promise<void> 
    dueChecker(): Promise<void>
}
