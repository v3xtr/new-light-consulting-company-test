import { Elysia } from 'elysia'
import { Task } from '@prisma/client';
import { TaskRepository } from '#infrastructure/repositories/TaskRepository.js';
import { ITaskRepository } from '#domain/repositories/ITaskRepository.js';
import { ITaskService } from '#domain/repositories/ITaskService.js';
import { ITaskController } from '#domain/repositories/ITaskController.js';
import { ApiResponse } from '#shared/response/ApiResponse.js';
import { TaskService } from '#domain/services/TaskService.js';
import { TaskController } from '../TaskController.js';
import { prisma } from '#infrastructure/config/adapters/db/prisma.js';
import { IDueChecker } from '#domain/repositories/IDueChecker.js';
import { DueChecker } from '#infrastructure/workers/DueChecker.js';

export async function taskRoutes(app: Elysia){
    const taskRepo: ITaskRepository = new TaskRepository(prisma)
    const dueChecker: IDueChecker = new DueChecker(taskRepo)
    const taskService: ITaskService = new TaskService(taskRepo, dueChecker)
    const taskController: ITaskController = new TaskController(taskService)

    app.get("/tasks", async ({ query }) => { 
        const task: Task[] | null = await taskController.getTasks(query)
        return new ApiResponse(200, task).statusOk()
    })
    
    app.get("/tasks/:id", async ({ params }) => {
        const task: Task | null = await taskController.getTaskById(params)
        return new ApiResponse(200, task).statusOk()
    })
    
    app.post("/tasks", async ({ body }) => {
        const task: Task = await taskController.uploadTask(body)
        return new ApiResponse(201, task).statusCreated()
    })
    
    app.put("/tasks/:id", async ({ params, body }) => { 
        const task: Task | null = await taskController.updateTask(params.id, body)
        return new ApiResponse(200, task).statusOk()
    })
    
    app.delete("/tasks/:id", async ({ params }) => {
        const task: Task | null = await taskController.deleteTask(params)
        return task ? new ApiResponse(200, "Task deleted successfully").statusOk() : new ApiResponse(404, "No such Task").statusNotFound()
    })
}
