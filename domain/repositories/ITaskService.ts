import { Task } from "@prisma/client";
import { CreateTaskDTO, GetTaskByStatusDTO, GetTaskByIdDTO, UpdateTaskDTO } from "#shared/dto/taskDto.js";

export interface ITaskService {
    createTask(data: CreateTaskDTO): Promise<Task>
    getAllTasks(status: GetTaskByStatusDTO | undefined): Promise<Task[] | null>;
    getTaskById(id: GetTaskByIdDTO): Promise<Task | null>
    updateTask(id: GetTaskByIdDTO, data: UpdateTaskDTO): Promise<Task>;
    deleteTask(id: GetTaskByIdDTO): Promise<Task>
}
