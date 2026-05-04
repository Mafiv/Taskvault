# Kanban Feature Assembly

This directory contains the assembly page for the Kanban Board module as part of the DevBoard group project.

## Architectural Compliance

According to the project requirements:
> "Configuration and Assembly only is allowed on System directory - the composites are imported from packages."

This page (`page.tsx`) strictly follows this rule. It does not contain complex state management or component logic. Instead, it acts purely as an **assembler** by composing:

1.  **UI Components** (`@devboard/ui-components`): Used for structural wrapping (`Card`, `CardBody`).
2.  **Kanban Composite** (`@devboard/kanban`): Imported as a complete, self-contained functional block (`<KanbanBoard />`).
3.  **Utilities** (`@devboard/utils`): Used to dynamically format dates, calculate "time ago", and generate page slugs (`formatDate`, `timeAgo`, `slugify`).

## Features Implemented

### 1. **Utils Package (`packages/utils`)**
A shared workspace library containing string manipulation, date formatting, and a robust `useLocalStorage` React hook. It is strictly typed with TypeScript generics and well-documented with JSDoc comments.

### 2. **Priority Tags (`packages/kanban`)**
Extended the `Task` schema to include an uppercase `Priority` enum (`"High" | "Medium" | "Low"`). The `TaskFormModal` was updated with a dropdown to select priority, and the `TaskCard` renders the corresponding `@devboard/ui-components` Badge. 

### 3. **Due Dates & Overdue Highlight (`packages/kanban`)**
Extended the `Task` schema to include an optional `dueDate`. The Kanban store handles this correctly. The `TaskCard` dynamically checks if the current date exceeds the due date. If it does, and the task is not "done", a subtle red border and background color are applied using Tailwind classes to emphasize urgency.
