import { Task } from "@prisma/client";
import { CreateTaskDTO, GetTaskByIdDTO, GetTaskByStatusDTO, UpdateTaskDTO } from "#shared/dto/taskDto.js";

export interface ITaskRepository{
    create(data: CreateTaskDTO): Promise<Task>
    getAll(status: GetTaskByStatusDTO| undefined): Promise<Task[] | null>
    getById(id: GetTaskByIdDTO): Promise<Task | null>
    update(id: GetTaskByIdDTO, data: UpdateTaskDTO): Promise<Task>
    delete(id: GetTaskByIdDTO): Promise<Task>
}
