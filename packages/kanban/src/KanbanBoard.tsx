"use client";

import React, { useState } from "react";
import { Button, Spinner } from "@devboard/ui-components";
import { Task, Status, COLUMNS, CreateTaskInput } from "./types";
import { useTaskStore } from "./useTaskStore";
import { TaskCard } from "./components/TaskCard";
import { TaskFormModal } from "./components/TaskFormModal";

export function KanbanBoard() {
  const { tasks, hydrated, addTask, updateTask, deleteTask, moveTask, getByStatus } = useTaskStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [defaultStatus, setDefaultStatus] = useState<Status>("todo");

  function handleAddInColumn(status: Status) {
    setDefaultStatus(status);
    setEditingTask(null);
    setModalOpen(true);
  }

  function handleEdit(task: Task) {
    setEditingTask(task);
    setModalOpen(true);
  }

  function handleSubmit(input: CreateTaskInput) {
    if (editingTask) {
      updateTask(editingTask.id, input);
    } else {
      addTask(input);
    }
  }

  function handleDelete(id: string) {
    if (confirm("Delete this task?")) deleteTask(id);
  }

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Task board</h1>
          <p className="text-sm text-gray-500 mt-0.5">{tasks.length} tasks total</p>
        </div>
        <Button onClick={() => handleAddInColumn("todo")} size="sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New task
        </Button>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0">
        {COLUMNS.map(col => {
          const colTasks = getByStatus(col.id);
          return (
            <div
              key={col.id}
              className="flex flex-col gap-3 bg-gray-50 rounded-2xl p-3 border border-gray-200 min-h-[400px]"
            >
              {/* Column header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">{col.label}</span>
                  <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                    {colTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => handleAddInColumn(col.id)}
                  className="text-gray-400 hover:text-indigo-600 transition-colors p-0.5 rounded"
                  title={`Add to ${col.label}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Tasks */}
              <div className="flex flex-col gap-2 flex-1">
                {colTasks.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-2 text-gray-400 py-8">
                    <svg className="w-8 h-8 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-xs">No tasks yet</span>
                  </div>
                ) : (
                  colTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onMove={moveTask}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TaskFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingTask(null); }}
        onSubmit={handleSubmit}
        initialTask={editingTask}
        defaultStatus={defaultStatus}
      />
    </div>
  );
}
