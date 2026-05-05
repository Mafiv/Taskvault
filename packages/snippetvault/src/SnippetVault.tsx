"use client";

import React, { useState } from "react";
import { Button } from "@devboard/ui-components";
import { useSnippetStore } from "./useSnippetStore";
import { SnippetFormModal } from "./SnippetFormModal";
import { SnippetCard } from "./SnippetCard";
import { CreateSnippetInput, Snippet } from "./types";

/**
 * Main SnippetVault component
 * Orchestrates F5 (save), F6 (preview), F7 (copy), F8 (search - by Student 4), F9 (tags - by Student 4)
 */
export function SnippetVault() {
  const store = useSnippetStore();
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveSnippet = async (input: CreateSnippetInput) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      store.addSnippet(input);
      setFormOpen(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSnippet = (id: string) => {
    store.deleteSnippet(id);
  };

  const handleEditSnippet = (snippet: Snippet) => {
    // TODO: Implement edit functionality for Student 5
    console.log("Edit snippet:", snippet);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Code Snippets</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Save and organize your favorite code snippets
          </p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 dark:bg-primary-500 rounded-xl hover:bg-primary-700 dark:hover:bg-primary-600 transition-all shadow-md shadow-primary-600/20 hover:shadow-lg hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          New Snippet
        </button>
      </div>

      {/* Form Modal */}
      <SnippetFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSaveSnippet}
        loading={loading}
      />

      {/* Snippets Grid */}
      {store.snippets.length === 0 ? (
        <div className="text-center py-20 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl rounded-3xl border border-gray-200/60 dark:border-white/5 shadow-sm transition-colors duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-500/10 mb-6 shadow-sm">
            <svg
              className="w-8 h-8 text-primary-500 dark:text-primary-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No snippets yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
            Create your first snippet to securely store and organize your reusable code blocks.
          </p>
          <button
            onClick={() => setFormOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-500/10 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-all border border-primary-100 dark:border-primary-500/20"
          >
            Create Snippet
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {store.snippets.map((snippet) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              onDelete={handleDeleteSnippet}
              onEdit={handleEditSnippet}
            />
          ))}
        </div>
      )}
    </div>
  );
}
