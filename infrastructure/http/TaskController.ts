import { ITaskController } from "#domain/repositories/ITaskController.js";
import { ITaskService } from "#domain/repositories/ITaskService.js";
import { createTaskSchema, getTaskByStatusSchema, manageTaskByIdSchema, updateTaskSchema } from "#shared/dto/taskDto.js";
import { ApiResponse } from "#shared/response/ApiResponse.js";
import { Task } from "@prisma/client";

export class TaskController implements ITaskController {
    constructor(private readonly taskService: ITaskService){}

    async getTasks(body: unknown): Promise<Task[] | null>{
        const validatedBody = getTaskByStatusSchema.safeParse(body)

        if(!validatedBody.success){
            console.error(validatedBody.error)
            throw new ApiResponse(400, "Bad Request").statusNotFound()
        }

        return this.taskService.getAllTasks(validatedBody.data)
    }
    
    async uploadTask(body: unknown): Promise<Task> {
        try {
             const validatedBody = createTaskSchema.safeParse(body)

            if(!validatedBody.success){
                console.error(validatedBody.error)
                throw new ApiResponse(400, "Bad Request").statusBadRequest()
            }

            return this.taskService.createTask({
                title: validatedBody.data.title,
                description: validatedBody.data.description ?? null,
                dueDate: new Date(validatedBody.data.dueDate),
                status: validatedBody.data.status ?? "pending",
            });
        } catch (error) {
            throw new ApiResponse(500, "Internal Server Error").statusInternalServerError()

        }
       
    }

    async getTaskById(body: unknown): Promise<Task | null> {
        try {
             const validatedBody = manageTaskByIdSchema.safeParse(body)

            if(!validatedBody.success){
                console.error(validatedBody.error)
                throw new ApiResponse(400, "Bad Request").statusInternalServerError()
            }

            return this.taskService.getTaskById(validatedBody.data)
        } catch (error) {
            throw new ApiResponse(500, "Internal Server Error").statusInternalServerError()
        }
    }


    async updateTask(id: unknown, body: unknown): Promise<Task> {
        try {
        if (typeof id !== "string") {
            throw new ApiResponse(400, "Invalid ID").statusBadRequest()
        }

        if (typeof body !== "object" || body === null) {
            throw new ApiResponse(400, "Invalid body").statusBadRequest()
        }

        const validatedBody = updateTaskSchema.parse({ ...body, id })
        
        return this.taskService.updateTask({ id }, validatedBody)
        } catch (error) {
            throw new ApiResponse(500, "Internal Server Error").statusInternalServerError()
        }
    }

    async deleteTask(body: unknown): Promise<Task> {
        try {
            const validatedBody = manageTaskByIdSchema.safeParse(body)

            if (!validatedBody.success){
                console.error(validatedBody.error)
                throw new ApiResponse(400, "Bad Request").statusBadRequest()
            }

            return await this.taskService.deleteTask(validatedBody.data)
        } catch (error) {
            throw new ApiResponse(500, "Internal Server Error").statusInternalServerError()
        }
    }
    
    

}
