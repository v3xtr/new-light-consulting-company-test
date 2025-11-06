import { Task } from '@prisma/client';
import z from 'zod'

export const createTaskSchema = z.object({
    title: z.string().min(1, "Enter a title"),
    description: z.string().nullable(),
    dueDate: z.string(),
    status: z.string().optional(),
});

export const manageTaskByIdSchema = z.object({
    id: z.string("550e8400-e29b-41d4-a716-446655440000")
})

export const updateTaskSchema = z.object({
  id: z.string("550e8400-e29b-41d4-a716-446655440000"),
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.enum(["pending", "completed"]).optional(),
});

export const getTaskByStatusSchema = z.object({
    status: z.enum(["pending", "completed"]).optional()
})

export type CreateTaskDTO = Omit<Task, "id" | "createdAt" | "updatedAt">;
export type GetTaskByIdDTO = z.infer<typeof manageTaskByIdSchema>
export type UpdateTaskDTO = z.infer<typeof updateTaskSchema>
export type GetTaskByStatusDTO = z.infer<typeof getTaskByStatusSchema>;
