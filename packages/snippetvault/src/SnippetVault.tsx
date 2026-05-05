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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Code Snippets</h1>
          <p className="text-sm text-gray-600 mt-1">
            Save and organize your favorite code snippets
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => setFormOpen(true)}
        >
          + New Snippet
        </Button>
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
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            No snippets yet
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Create your first snippet to get started
          </p>
          <Button
            variant="primary"
            onClick={() => setFormOpen(true)}
          >
            Create Snippet
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
