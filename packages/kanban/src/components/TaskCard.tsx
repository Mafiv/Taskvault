"use client";

import React from "react";
import { Card, CardBody, Badge } from "@devboard/ui-components";
import { Task, Priority, Status } from "../types";

const priorityConfig: Record<Priority, { label: string; color: "red" | "yellow" | "blue" }> = {
  high:   { label: "High",   color: "red" },
  medium: { label: "Medium", color: "yellow" },
  low:    { label: "Low",    color: "blue" },
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
    <Card className={["group transition-all", overdue ? "border-red-300 bg-red-50/40" : ""].join(" ")}>
      <CardBody className="p-3 flex flex-col gap-2">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-medium text-gray-800 leading-snug flex-1">{task.title}</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={() => onEdit(task)}
              className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              title="Edit"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{task.description}</p>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge color={priorityColor}>{priorityLabel}</Badge>
            {task.dueDate && (
              <span className={["text-xs font-medium", overdue ? "text-red-600" : "text-gray-500"].join(" ")}>
                {overdue ? "⚠ " : ""}
                {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            )}
          </div>

          {/* Quick move select */}
          <select
            value={task.status}
            onChange={(e) => onMove(task.id, e.target.value as Status)}
            className="text-xs text-gray-500 bg-transparent border-none outline-none cursor-pointer hover:text-gray-800 transition-colors"
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
