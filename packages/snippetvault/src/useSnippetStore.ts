"use client";

import { useState, useEffect } from "react";
import { Snippet, CreateSnippetInput, UpdateSnippetInput } from "./types";

/**
 * Generate a unique ID for snippets (simple CUID-like implementation)
 */
function generateId(): string {
  return `snippet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Simple localStorage persistence hook
 */
function useLocalStorageSnippets(key: string, initialValue: Snippet[]): [Snippet[], (value: Snippet[]) => void] {
  const [storedValue, setStoredValue] = useState<Snippet[]>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: Snippet[]) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Custom hook for managing snippet state with localStorage persistence
 * Implements F5 (save), and supports F8, F9 (search/filter) by Student 4
 */
export function useSnippetStore() {
  const [snippets, setSnippets] = useLocalStorageSnippets("devboard_snippets", []);

  const addSnippet = (input: CreateSnippetInput): Snippet => {
    const newSnippet: Snippet = {
      id: generateId(),
      title: input.title,
      code: input.code,
      language: input.language,
      tags: input.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setSnippets([...snippets, newSnippet]);
    return newSnippet;
  };

  const updateSnippet = (input: UpdateSnippetInput): Snippet | null => {
    const index = snippets.findIndex((s: Snippet) => s.id === input.id);
    if (index === -1) return null;

    const updated: Snippet = {
      ...snippets[index],
      title: input.title ?? snippets[index].title,
      code: input.code ?? snippets[index].code,
      language: input.language ?? snippets[index].language,
      tags: input.tags ?? snippets[index].tags,
      updatedAt: new Date(),
    };

    const newSnippets = [...snippets];
    newSnippets[index] = updated;
    setSnippets(newSnippets);
    return updated;
  };

  const deleteSnippet = (id: string): boolean => {
    const index = snippets.findIndex((s: Snippet) => s.id === id);
    if (index === -1) return false;

    const newSnippets = snippets.filter((_: Snippet, i: number) => i !== index);
    setSnippets(newSnippets);
    return true;
  };

  const getSnippetById = (id: string): Snippet | null => {
    return snippets.find((s: Snippet) => s.id === id) || null;
  };

  const getAllSnippets = (): Snippet[] => {
    return snippets;
  };

  return {
    snippets,
    addSnippet,
    updateSnippet,
    deleteSnippet,
    getSnippetById,
    getAllSnippets,
  };
}
