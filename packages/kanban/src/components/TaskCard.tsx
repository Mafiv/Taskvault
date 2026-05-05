"use client";

import React from "react";
import { Card, CardBody, Badge } from "@devboard/ui-components";
import { formatDate } from "@devboard/utils";
import { Task, Priority, Status } from "../types";

const priorityConfig: Record<Priority, { label: string; color: "red" | "yellow" | "blue" }> = {
  High:   { label: "High",   color: "red" },
  Medium: { label: "Medium", color: "yellow" },
  Low:    { label: "Low",    color: "blue" },
};

const statusOptions: { value: Status; label: string }[] = [
  { value: "todo",        label: "To do" },
  { value: "in-progress", label: "In progress" },
  { value: "done",        label: "Done" },
];

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: Status) => void;
}

function isOverdue(dueDate?: string): boolean {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date(new Date().toDateString());
}

export function TaskCard({ task, onEdit, onDelete, onMove }: TaskCardProps) {
  const { label: priorityLabel, color: priorityColor } = priorityConfig[task.priority];
  const overdue = isOverdue(task.dueDate) && task.status !== "done";

  return (
    <Card className={["group transition-all duration-300 hover:shadow-lg dark:hover:shadow-2xl dark:bg-zinc-800/80 backdrop-blur-md rounded-2xl border", overdue ? "border-red-300 dark:border-red-500/50 bg-red-50/50 dark:bg-red-500/10" : "border-gray-200/60 dark:border-white/10 hover:border-primary-300 dark:hover:border-primary-500/50"].join(" ")}>
      <CardBody className="p-4 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <span className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-snug flex-1">{task.title}</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-500/10 text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">{task.description}</p>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100 dark:border-white/5 mt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge color={priorityColor}>{priorityLabel}</Badge>
            {task.dueDate && (
              <span className={["text-[11px] font-bold px-2 py-1 rounded-full", overdue ? "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400" : "bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300"].join(" ")}>
                {overdue ? "⚠ " : ""}
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>

          {/* Quick move select */}
          <select
            value={task.status}
            onChange={(e) => onMove(task.id, e.target.value as Status)}
            className="text-[11px] font-bold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-500/30 transition-all appearance-none"
            title="Move to column"
          >
            {statusOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </CardBody>
    </Card>
  );
}
