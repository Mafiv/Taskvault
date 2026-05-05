"use client";

import React, { useState } from "react";
import { Modal, Button, Input, Textarea } from "@devboard/ui-components";
import { CreateSnippetInput, CodeLanguage } from "./types";

const LANGUAGES: CodeLanguage[] = [
  "javascript",
  "typescript",
  "jsx",
  "tsx",
  "python",
  "html",
  "css",
  "json",
  "sql",
  "bash",
  "rust",
  "go",
  "java",
  "cpp",
  "c",
  "php",
  "ruby",
  "swift",
  "kotlin",
  "plaintext",
];

interface SnippetFormModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (input: CreateSnippetInput) => void;
  loading?: boolean;
}

/**
 * F5 — Snippet save form modal
 * Allows users to create a new snippet with title, code, and language
 */
export function SnippetFormModal({
  open,
  onClose,
  onSave,
  loading = false,
}: SnippetFormModalProps) {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<CodeLanguage>("javascript");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!code.trim()) {
      newErrors.code = "Code is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      title: title.trim(),
      code: code.trim(),
      language,
    });

    // Reset form
    setTitle("");
    setCode("");
    setLanguage("javascript");
    setErrors({});
  };

  const handleClose = () => {
    setTitle("");
    setCode("");
    setLanguage("javascript");
    setErrors({});
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Save a New Snippet"
      footer={
        <>
          <Button variant="ghost" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            loading={loading}
          >
            Save Snippet
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Title"
          placeholder="e.g., React Hook Pattern"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
        />

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-1">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as CodeLanguage)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900
              focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
              transition duration-150"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <Textarea
          label="Code"
          placeholder="Paste your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          error={errors.code}
          className="font-mono text-xs"
          rows={10}
        />
      </div>
    </Modal>
  );
}
