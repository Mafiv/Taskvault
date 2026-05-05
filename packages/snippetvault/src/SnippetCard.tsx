"use client";

import React, { useState } from "react";
import { Button, Toast } from "@devboard/ui-components";
import { Snippet } from "./types";
import { SnippetPreview } from "./SnippetPreview";

interface SnippetCardProps {
  snippet: Snippet;
  onDelete?: (id: string) => void;
  onEdit?: (snippet: Snippet) => void;
}

/**
 * F7 — One-click copy to clipboard + toast confirmation
 * Displays a snippet with copy functionality and optional edit/delete actions
 */
export function SnippetCard({ snippet, onDelete, onEdit }: SnippetCardProps) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setShowToast(true);

      // Reset copied state after animation
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-zinc-900 overflow-hidden hover:shadow-xl dark:hover:shadow-2xl hover:-translate-y-1 hover:border-primary-300 dark:hover:border-primary-500/50 transition-all duration-300 group flex flex-col h-full">
        <div className="flex-1 overflow-hidden">
          <SnippetPreview snippet={snippet} />
        </div>

        {/* Actions Footer */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-zinc-900 flex items-center justify-between gap-2">
          <div className="flex-1 flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleCopy}
              className="flex-1 font-semibold shadow-sm"
            >
              {copied ? "✓ Copied!" : "Copy Code"}
            </Button>

            {onEdit && (
              <button
                onClick={() => onEdit(snippet)}
                className="px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
              >
                Edit
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => {
                  if (window.confirm("Delete this snippet?")) {
                    onDelete(snippet.id);
                  }
                }}
                className="px-3 py-1.5 text-sm font-semibold text-red-600 dark:text-red-400 bg-white dark:bg-zinc-800 border border-red-200 dark:border-red-500/20 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors shadow-sm"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {showToast && (
        <Toast
          message="Snippet copied to clipboard!"
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
