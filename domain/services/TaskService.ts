import { IDueChecker } from "#domain/repositories/IDueChecker.js";
import { ITaskRepository } from "#domain/repositories/ITaskRepository.js";
import { ITaskService } from "#domain/repositories/ITaskService.js";
import { CreateTaskDTO, GetTaskByIdDTO, GetTaskByStatusDTO, UpdateTaskDTO,  } from "#shared/dto/taskDto.js";
import { Task } from "@prisma/client";

export class TaskService implements ITaskService{
    constructor(
        private readonly taskRepo: ITaskRepository,
        private readonly dueChecker: IDueChecker
    ){}

    async createTask(data: CreateTaskDTO): Promise<Task> {
        const task = await this.taskRepo.create(data);
        await this.dueChecker.checkTask(task);
        return task;
    }

    async getAllTasks(status?: GetTaskByStatusDTO | undefined): Promise<Task[] | null> {
        return this.taskRepo.getAll(status);
    }

    async getTaskById(id: GetTaskByIdDTO): Promise<Task | null> {
        return this.taskRepo.getById(id)
    }

    async updateTask(id: GetTaskByIdDTO, data: UpdateTaskDTO): Promise<Task> {
        const task = await this.taskRepo.update(id, data);
        await this.dueChecker.checkTask(task);
        return task;
    }

    async deleteTask(id: GetTaskByIdDTO): Promise<Task> {
        return this.taskRepo.delete(id)
    }
}
