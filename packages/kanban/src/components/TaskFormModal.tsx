"use client";

import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Textarea } from "@Taskvault/ui-components";
import { Task, CreateTaskInput, Priority, Status } from "../types";

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: CreateTaskInput) => void;
  initialTask?: Task | null;
  defaultStatus?: Status;
}

const emptyForm = (): CreateTaskInput => ({
  title: "",
  description: "",
  priority: "medium",
  status: "todo",
  dueDate: "",
});

export function TaskFormModal({
  open,
  onClose,
  onSubmit,
  initialTask,
  defaultStatus = "todo",
}: TaskFormModalProps) {
  const [form, setForm] = useState<CreateTaskInput>(emptyForm());
  const [errors, setErrors] = useState<Partial<Record<keyof CreateTaskInput, string>>>({});

  useEffect(() => {
    if (open) {
      setForm(
        initialTask
          ? {
              title: initialTask.title,
              description: initialTask.description ?? "",
              priority: initialTask.priority,
              status: initialTask.status,
              dueDate: initialTask.dueDate ?? "",
            }
          : { ...emptyForm(), status: defaultStatus }
      );
      setErrors({});
    }
  }, [open, initialTask, defaultStatus]);

  function validate(): boolean {
    const errs: typeof errors = {};
    if (!form.title.trim()) errs.title = "Title is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    onSubmit({ ...form, title: form.title.trim() });
    onClose();
  }

  const set = (field: keyof CreateTaskInput, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const isEdit = !!initialTask;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit task" : "New task"}
      footer={
        <>
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleSubmit}>{isEdit ? "Save changes" : "Create task"}</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Title"
          placeholder="What needs to be done?"
          value={form.title}
          onChange={e => set("title", e.target.value)}
          error={errors.title}
          autoFocus
        />

        <Textarea
          label="Description (optional)"
          placeholder="Add more details..."
          value={form.description}
          onChange={e => set("description", e.target.value)}
          rows={3}
        />

        <div className="grid grid-cols-2 gap-3">
          {/* Priority */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <select
              value={form.priority}
              onChange={e => set("priority", e.target.value as Priority)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Column</label>
            <select
              value={form.status}
              onChange={e => set("status", e.target.value as Status)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <Input
          label="Due date (optional)"
          type="date"
          value={form.dueDate}
          onChange={e => set("dueDate", e.target.value)}
        />
      </div>
    </Modal>
  );
}
