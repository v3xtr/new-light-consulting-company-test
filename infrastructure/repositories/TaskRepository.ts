import { PrismaClient, Task } from "@prisma/client";
import { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import { CreateTaskDTO, GetTaskByIdDTO, GetTaskByStatusDTO, UpdateTaskSchemaDTO } from "../../application/dto/taskDto";

export class TaskRepository implements ITaskRepository{
    constructor(private readonly prisma: PrismaClient){}

    async create(data: CreateTaskDTO): Promise<Task>{
        return this.prisma.task.create({ data })
    }

    async getAll(status: GetTaskByStatusDTO | undefined): Promise<Task[] | null>{
        return this.prisma.task.findMany({
            where: { ...(status?.status ? { status: status?.status }: {})}
        })
    }

    async getById(id: GetTaskByIdDTO): Promise<Task | null>{
         return this.prisma.task.findFirst({
            where: { id: id.id }
        })
    }

    async update(id: GetTaskByIdDTO, data: UpdateTaskSchemaDTO): Promise<Task>{
        return this.prisma.task.update({
            where: { id: id.id },
            data
        })
    }

    async delete(id: GetTaskByIdDTO): Promise<Task>{
        return this.prisma.task.delete({ where: { id: id.id } })
    }
}
