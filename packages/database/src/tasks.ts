import { prisma } from "./client";
import { Task } from "@prisma/client";

export type TaskWithDates = Task;

export async function getTasks(): Promise<TaskWithDates[]> {
  return prisma.task.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getTaskById(id: string): Promise<TaskWithDates | null> {
  return prisma.task.findUnique({
    where: { id },
  });
}

export async function getTasksByStatus(status: string): Promise<TaskWithDates[]> {
  return prisma.task.findMany({
    where: { status },
    orderBy: { createdAt: "desc" },
  });
}

export async function createTask(data: {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
}): Promise<TaskWithDates> {
  return prisma.task.create({
    data,
  });
}

export async function updateTask(
  id: string,
  data: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
  }
): Promise<TaskWithDates> {
  return prisma.task.update({
    where: { id },
    data,
  });
}

export async function deleteTask(id: string): Promise<TaskWithDates> {
  return prisma.task.delete({
    where: { id },
  });
}
