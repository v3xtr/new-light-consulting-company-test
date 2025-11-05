import { Elysia } from 'elysia'
import { ITaskController } from '../../../domain/repositories/ITaskController';
import { TaskController } from '../TaskController';
import { ITaskService } from '../../../domain/repositories/ITaskService';
import { TaskService } from '../../../domain/services/TaskService';
import { ITaskRepository } from '../../../domain/repositories/ITaskRepository';
import { TaskRepository } from '../../repositories/TaskRepository';
import { prisma } from '../../config/adapters/db/prisma';
import { ApiResponse } from '../../../shared/response/ApiResponse';
import { Task } from '@prisma/client';

export async function taskRoutes(app: Elysia){
    const taskRepo: ITaskRepository = new TaskRepository(prisma)
    const taskService: ITaskService = new TaskService(taskRepo)
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
