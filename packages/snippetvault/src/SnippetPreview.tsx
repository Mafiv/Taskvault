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
    <div className="flex flex-col h-full bg-[#0d1117]">
      {/* Header */}
      <div className="bg-[#161b22] px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* macOS window controls mock */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <h3 className="text-sm font-semibold text-gray-200 ml-2">{snippet.title}</h3>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-gray-800 px-2 py-1 rounded-md">
          {snippet.language}
        </span>
      </div>

      {/* Code Block */}
      <div className="flex-1 overflow-auto max-h-[250px] custom-scrollbar">
        <pre className="text-[13px] text-gray-300 p-4 font-mono leading-loose">
          <code className={languageClassMap[snippet.language]}>
            {snippet.code}
          </code>
        </pre>
      </div>
    </div>
  );
}
