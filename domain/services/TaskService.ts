import { CreateTaskDTO, GetTaskByIdDTO, GetTaskByStatusDTO, UpdateTaskSchemaDTO } from "../../application/dto/taskDto";
import { ITaskRepository } from "../repositories/ITaskRepository"
import { ITaskService } from "../repositories/ITaskService"
import { Task } from "@prisma/client";

export class TaskService implements ITaskService{
    constructor(private readonly taskRepo: ITaskRepository){}

    async createTask(data: CreateTaskDTO): Promise<Task>{
        return this.taskRepo.create(data)
    }

    async getAllTasks(status?: GetTaskByStatusDTO | undefined): Promise<Task[] | null> {
        return this.taskRepo.getAll(status);
    }

    async getTaskById(id: GetTaskByIdDTO): Promise<Task | null> {
        return this.taskRepo.getById(id)
    }

    async updateTask(id: GetTaskByIdDTO, data: UpdateTaskSchemaDTO): Promise<Task> {
        return this.taskRepo.update(id, data);
    }


    async deleteTask(id: GetTaskByIdDTO): Promise<Task> {
        return this.taskRepo.delete(id)
    }
}
