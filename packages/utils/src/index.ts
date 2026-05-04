import { useState, useEffect } from "react";

// ── Date Helpers ───────────────────────────────────────────────

/**
 * Formats a date string or Date object into a human-readable format.
 * @param {string | Date} date - The date to format.
 * @returns {string} The formatted date string (e.g., "Jan 1, 2024").
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/**
 * Returns a relative time string (e.g., "just now", "5m ago", "2h ago", "3d ago").
 * @param {string | Date} date - The date to compare against the current time.
 * @returns {string} The relative time string.
 */
export function timeAgo(date: string | Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ── String Helpers ─────────────────────────────────────────────

/**
 * Truncates a string to a specified maximum length and appends an ellipsis ("...").
 * @param {string} str - The string to truncate.
 * @param {number} maxLength - The maximum length of the truncated string, including the ellipsis.
 * @returns {string} The truncated string.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

/**
 * Converts a string into a URL-friendly slug.
 * @param {string} str - The string to slugify.
 * @returns {string} The slugified string.
 */
export function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

// ── Storage Hook ───────────────────────────────────────────────

/**
 * A custom React hook for managing state synchronized with localStorage.
 * @template T
 * @param {string} key - The localStorage key to use.
 * @param {T} initialValue - The initial value to use if no value is stored in localStorage.
 * @returns {[T, (value: T | ((val: T) => T)) => void]} A stateful value, and a function to update it.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// ── Array Helpers ──────────────────────────────────────────────

/**
 * Filters an array of objects based on a search query applied to specified fields.
 * @template T
 * @param {T[]} items - The array of objects to filter.
 * @param {string} query - The search query string.
 * @param {(keyof T)[]} fields - The fields of the objects to search within.
 * @returns {T[]} The filtered array of objects.
 */
export function filterBySearch<T extends Record<string, unknown>>(
  items: T[],
  query: string,
  fields: (keyof T)[]
): T[] {
  const q = query.toLowerCase().trim();
  if (!q) return items;
  return items.filter(item =>
    fields.some(f => String(item[f] ?? "").toLowerCase().includes(q))
  );
}

/**
 * Sorts an array of objects by a specified key and direction.
 * @template T
 * @param {T[]} items - The array of objects to sort.
 * @param {keyof T} key - The key of the objects to sort by.
 * @param {"asc" | "desc"} [dir="asc"] - The sort direction ("asc" or "desc").
 * @returns {T[]} A new array containing the sorted objects.
 */
export function sortBy<T>(items: T[], key: keyof T, dir: "asc" | "desc" = "asc"): T[] {
  return [...items].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (av === bv) return 0;
    const cmp = (av as any) < (bv as any) ? -1 : 1;
    return dir === "asc" ? cmp : -cmp;
  });
}
