import { ITaskRepository } from "#domain/repositories/ITaskRepository.js";
import { CreateTaskDTO, GetTaskByIdDTO, GetTaskByStatusDTO, UpdateTaskDTO } from "#shared/dto/taskDto.js";
import { PrismaClient, Task } from "@prisma/client";


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

    async update(id: GetTaskByIdDTO, data: UpdateTaskDTO): Promise<Task>{
        return this.prisma.task.update({
            where: { id: id.id },
            data
        })
    }

    async delete(id: GetTaskByIdDTO): Promise<Task>{
        return this.prisma.task.delete({ where: { id: id.id } })
    }
}
