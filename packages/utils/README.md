# `@devboard/utils`

A collection of shared utility functions and React hooks for the DevBoard monorepo. This package is designed to be highly reusable, strictly typed, and well-documented.

## Installation

This package is part of the DevBoard monorepo workspaces. To use it in another package or app within the monorepo, add it to the `package.json` dependencies:

```json
{
  "dependencies": {
    "@devboard/utils": "workspace:*"
  }
}
```

Then run `npm install` from the root of the repository.

## Available Utilities

### Date Helpers

- **`formatDate(date: string | Date): string`**
  Formats a date string or `Date` object into a human-readable format (e.g., "Jan 1, 2024").

- **`timeAgo(date: string | Date): string`**
  Returns a relative time string comparing the given date to the current time (e.g., "just now", "5m ago", "2h ago", "3d ago").

### String Helpers

- **`truncate(str: string, maxLength: number): string`**
  Truncates a string to a specified maximum length and appends an ellipsis ("...") if it exceeds the limit.

- **`slugify(str: string): string`**
  Converts a string into a URL-friendly slug, stripping special characters and replacing spaces with hyphens.

### Hooks

- **`useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void]`**
  A robust React hook for managing state synchronized with the browser's `localStorage`. It safely handles SSR environments and provides error handling for storage quota limits or restricted access.

### Array Helpers

- **`filterBySearch<T>(items: T[], query: string, fields: (keyof T)[]): T[]`**
  Filters an array of objects based on a case-insensitive search query matched against the specified fields.

- **`sortBy<T>(items: T[], key: keyof T, dir?: "asc" | "desc"): T[]`**
  Sorts an array of objects by a specific property key. Returns a new sorted array.

## Usage Example

```tsx
import { formatDate, useLocalStorage, sortBy } from "@devboard/utils";

export default function MyComponent() {
  const [tasks, setTasks] = useLocalStorage("my-tasks", []);

  const sortedTasks = sortBy(tasks, "dueDate", "asc");

  return (
    <div>
      {sortedTasks.map(task => (
        <div key={task.id}>
          {task.title} - Due: {formatDate(task.dueDate)}
        </div>
      ))}
    </div>
  );
}
```
