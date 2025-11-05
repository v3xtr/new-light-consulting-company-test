import { Task } from "@prisma/client";
import { CreateTaskDTO, GetTaskByIdDTO, GetTaskByStatusDTO, UpdateTaskSchemaDTO } from "../../application/dto/taskDto";

export interface ITaskRepository{
    create(data: CreateTaskDTO): Promise<Task>
    getAll(status: GetTaskByStatusDTO| undefined): Promise<Task[] | null>
    getById(id: GetTaskByIdDTO): Promise<Task | null>
    update(id: GetTaskByIdDTO, data: UpdateTaskSchemaDTO): Promise<Task>
    delete(id: GetTaskByIdDTO): Promise<Task>
}
