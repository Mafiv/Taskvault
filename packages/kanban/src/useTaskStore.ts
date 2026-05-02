"use client";

import { useState, useEffect, useCallback } from "react";
import { Task, CreateTaskInput, UpdateTaskInput, Status } from "./types";

const STORAGE_KEY = "Taskvault:tasks";

function generateId(): string {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function loadFromStorage(): Task[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(tasks: Task[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // ignore storage errors
  }
}

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTasks(loadFromStorage());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Task[]) => {
    setTasks(next);
    saveToStorage(next);
  }, []);

  const addTask = useCallback((input: CreateTaskInput): Task => {
    const task: Task = {
      ...input,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => {
      const next = [task, ...prev];
      saveToStorage(next);
      return next;
    });
    return task;
  }, []);

  const updateTask = useCallback((id: string, input: UpdateTaskInput) => {
    setTasks(prev => {
      const next = prev.map(t => t.id === id ? { ...t, ...input } : t);
      saveToStorage(next);
      return next;
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => {
      const next = prev.filter(t => t.id !== id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const moveTask = useCallback((id: string, status: Status) => {
    setTasks(prev => {
      const next = prev.map(t => t.id === id ? { ...t, status } : t);
      saveToStorage(next);
      return next;
    });
  }, []);

  const getByStatus = useCallback((status: Status) => {
    return tasks.filter(t => t.status === status);
  }, [tasks]);

  return { tasks, hydrated, addTask, updateTask, deleteTask, moveTask, getByStatus };
}
