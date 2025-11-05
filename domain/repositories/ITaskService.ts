import { Task } from "@prisma/client";
import { CreateTaskDTO, GetTaskByStatusDTO, GetTaskByIdDTO, UpdateTaskSchemaDTO } from "../../application/dto/taskDto";

export interface ITaskService {
    createTask(data: CreateTaskDTO): Promise<Task>
    getAllTasks(status: GetTaskByStatusDTO | undefined): Promise<Task[] | null>;
    getTaskById(id: GetTaskByIdDTO): Promise<Task | null>
    updateTask(id: GetTaskByIdDTO, data: UpdateTaskSchemaDTO): Promise<Task>;
    deleteTask(id: GetTaskByIdDTO): Promise<Task>
}
