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
    <div className="h-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Task Board</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total</p>
        </div>
        <button 
          onClick={() => handleAddInColumn("todo")}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 dark:bg-primary-500 rounded-xl hover:bg-primary-700 dark:hover:bg-primary-600 transition-all shadow-md shadow-primary-600/20 hover:shadow-lg hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </button>
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        {COLUMNS.map(col => {
          const colTasks = getByStatus(col.id);
          return (
            <div
              key={col.id}
              className="flex flex-col gap-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl p-5 border border-gray-200/60 dark:border-white/5 shadow-sm min-h-[500px] transition-colors duration-300"
            >
              {/* Column header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">{col.label}</span>
                  <span className="bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 text-xs font-bold px-2.5 py-1 rounded-full border border-primary-200 dark:border-primary-500/30">
                    {colTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => handleAddInColumn(col.id)}
                  className="text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-all duration-200 p-2 rounded-xl"
                  title={`Add to ${col.label}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>

              {/* Tasks */}
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {colTasks.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-400 dark:text-gray-500 py-12">
                    <svg className="w-10 h-10 opacity-20 dark:opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-sm font-semibold tracking-wide">No tasks yet</span>
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
