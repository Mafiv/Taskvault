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
    <Card className={["group transition-all duration-200 hover:shadow-md", overdue ? "border-red-300 bg-red-50/50" : "hover:border-indigo-200"].join(" ")}>
      <CardBody className="p-4 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <span className="text-sm font-semibold text-gray-800 leading-snug flex-1">{task.title}</span>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 rounded-lg hover:bg-indigo-50 text-gray-400 hover:text-indigo-600 transition-colors"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
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
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{task.description}</p>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge color={priorityColor}>{priorityLabel}</Badge>
            {task.dueDate && (
              <span className={["text-xs font-medium px-2 py-1 rounded-full", overdue ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"].join(" ")}>
                {overdue ? "⚠ " : ""}
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>

          {/* Quick move select */}
          <select
            value={task.status}
            onChange={(e) => onMove(task.id, e.target.value as Status)}
            className="text-xs font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 outline-none cursor-pointer hover:text-indigo-600 hover:border-indigo-200 transition-colors"
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
