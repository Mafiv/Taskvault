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
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
        <SnippetPreview snippet={snippet} />

        {/* Actions Footer */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-2">
          <div className="flex-1 flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleCopy}
              className="flex-1"
            >
              {copied ? "✓ Copied!" : "Copy Code"}
            </Button>

            {onEdit && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit(snippet)}
              >
                Edit
              </Button>
            )}

            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  if (window.confirm("Delete this snippet?")) {
                    onDelete(snippet.id);
                  }
                }}
              >
                Delete
              </Button>
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
