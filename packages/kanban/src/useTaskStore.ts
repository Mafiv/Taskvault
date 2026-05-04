"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "@devboard/utils";
import { Task, CreateTaskInput, UpdateTaskInput, Status } from "./types";

const STORAGE_KEY = "devboard:tasks";

function generateId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

export function useTaskStore() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, []);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const addTask = useCallback((input: CreateTaskInput): Task => {
    const task: Task = {
      ...input,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => {
      const next = [task, ...prev];
      return next;
    });
    return task;
  }, [setTasks]);

  const updateTask = useCallback((id: string, input: UpdateTaskInput) => {
    setTasks(prev => {
      const next = prev.map(t => t.id === id ? { ...t, ...input } : t);
      return next;
    });
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => {
      const next = prev.filter(t => t.id !== id);
      return next;
    });
  }, [setTasks]);

  const moveTask = useCallback((id: string, status: Status) => {
    setTasks(prev => {
      const next = prev.map(t => t.id === id ? { ...t, status } : t);
      return next;
    });
  }, [setTasks]);

  const getByStatus = useCallback((status: Status) => {
    return tasks.filter(t => t.status === status);
  }, [tasks]);

  return { tasks, hydrated, addTask, updateTask, deleteTask, moveTask, getByStatus };
}
