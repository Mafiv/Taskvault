export type Priority = "High" | "Medium" | "Low";
export type Status = "todo" | "in-progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string;       // ISO date string e.g. "2025-06-01"
  createdAt: string;      // ISO datetime string
}

export type CreateTaskInput = Omit<Task, "id" | "createdAt">;
export type UpdateTaskInput = Partial<CreateTaskInput>;

export const COLUMNS: { id: Status; label: string }[] = [
  { id: "todo",        label: "To do" },
  { id: "in-progress", label: "In progress" },
  { id: "done",        label: "Done" },
];
