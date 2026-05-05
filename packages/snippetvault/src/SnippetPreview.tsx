"use client";

import React from "react";
import { Snippet, CodeLanguage } from "./types";

/**
 * F6 — Syntax-highlighted code preview
 * Uses a simple implementation with language detection
 * In production, you'd use prism-react-renderer for advanced syntax highlighting
 */
interface SnippetPreviewProps {
  snippet: Snippet;
}

// Simple language class mapping for basic highlighting
const languageClassMap: Record<CodeLanguage, string> = {
  javascript: "language-javascript",
  typescript: "language-typescript",
  jsx: "language-jsx",
  tsx: "language-tsx",
  python: "language-python",
  html: "language-html",
  css: "language-css",
  json: "language-json",
  sql: "language-sql",
  bash: "language-bash",
  rust: "language-rust",
  go: "language-go",
  java: "language-java",
  cpp: "language-cpp",
  c: "language-c",
  php: "language-php",
  ruby: "language-ruby",
  swift: "language-swift",
  kotlin: "language-kotlin",
  plaintext: "language-plaintext",
};

export function SnippetPreview({ snippet }: SnippetPreviewProps) {
  return (
    <div className="rounded-lg border border-gray-300 bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">{snippet.title}</h3>
          <p className="text-xs text-gray-400 mt-1">
            {snippet.language.toUpperCase()} • Created {new Date(snippet.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Code Block */}
      <div className="overflow-auto">
        <pre className="text-sm text-gray-100 p-4 font-mono leading-relaxed">
          <code className={languageClassMap[snippet.language]}>
            {snippet.code}
          </code>
        </pre>
      </div>
    </div>
  );
}
