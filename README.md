# DevBoard

**A developer productivity workspace — task tracking and code snippet management in one place.**

Built as a modular monorepo using Turborepo and npm workspaces, with shared UI components and utilities consumed across two feature packages.

---

## What it does

DevBoard has two core features:

**Tasks** — A kanban-style board for managing your work. Create tasks, assign priorities, set due dates, and move them across columns as you make progress.

**Snippets** — A personal code snippet vault. Save, tag, search, and copy reusable pieces of code with syntax highlighting per language.

---

## Monorepo structure

```
devboard/
├── apps/
│   └── devboard/          # Next.js 14 application
│
├── packages/
│   ├── ui-components/     # Shared React component library
│   ├── utils/             # Shared utility functions and hooks
│   ├── kanban/             # Kanban task tracker feature
│   └── snippetvault/        # Code snippet vault feature
│
├── turbo.json             # Turborepo pipeline config
└── package.json           # Root workspace config
```

---

## Packages

### `@devboard/ui-components`
Reusable React components used across all features. Built from scratch with Tailwind CSS.

| Component | Description |
|---|---|
| `Button` | Primary, secondary, danger, ghost variants with loading state |
| `Card` | Container with optional header, body, and footer sections |
| `Badge` | Color-coded labels for status and priority indicators |
| `Modal` | Accessible dialog with backdrop, ESC to close, and footer slot |
| `Input` / `Textarea` | Form fields with label, error, and hint support |
| `Spinner` | Animated loading indicator |
| `Toast` | Auto-dismissing notification for success, error, and info |

### `@devboard/utils`
Pure utility functions and React hooks shared across packages.

| Export | Description |
|---|---|
| `formatDate` | Formats a date into a readable string (e.g. "May 2, 2026") |
| `timeAgo` | Returns relative time (e.g. "3h ago") |
| `truncate` | Truncates a string to a max length with ellipsis |
| `slugify` | Converts a string to a URL-safe slug |
| `filterBySearch` | Filters an array of objects by a search query across specified fields |
| `sortBy` | Sorts an array of objects by a key, ascending or descending |
| `getStored` / `setStored` | Type-safe localStorage read/write helpers |

### `@devboard/kanban`
The kanban task tracker. All state lives in `localStorage` — no backend required.

**Features:**
- Kanban board with three columns: To do, In progress, Done
- Add, edit, and delete tasks via modal
- Priority levels: High, Medium, Low — color-coded
- Due dates with automatic overdue highlighting
- Quick-move tasks between columns from the card itself
- Live search and filter by task title
- Drag and drop tasks across columns

### `@devboard/snippetvault`
The code snippet vault. Save and organize code for reuse.

**Features:**
- Save snippets with a title, code body, and language tag
- Syntax-highlighted code preview per language
- One-click copy to clipboard with toast confirmation
- Live search across title and code body
- Multi-tag system — tag snippets and filter by tag
- Edit and delete existing snippets

---

## Getting started

**Requirements:** Node.js 18+, npm 9+

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/devboard.git
cd devboard

# 2. Install all dependencies from root
npm install

# 3. Start the development server
npm run dev
```

The app runs at **http://localhost:3000**

---

## Available scripts

Run all scripts from the **root** of the monorepo.

```bash
npm run dev          # Start all packages in dev mode (parallel)
npm run build        # Build all packages and the app
npm run lint         # Lint all packages
npm run type-check   # TypeScript check across all packages
```

---

## Tech stack

| Tool | Purpose |
|---|---|
| [Turborepo](https://turbo.build) | Monorepo build orchestration and caching |
| [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) | Package linking and dependency management |
| [Next.js 14](https://nextjs.org) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org) | End-to-end type safety |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| localStorage | Client-side data persistence — no backend needed |

---

## Team

| Student | Owns |
|---|---|
| Student 1 | Monorepo setup, `ui-components`, Tasks F1 + F2 (Kanban board + CRUD) |
| Student 2 | `utils` library, Tasks F3 + F4 (priorities + due dates) |
| Student 3 | Snippets F5 + F6 + F7 (save, syntax highlight, copy) |
| Student 4 | Snippets F8 + F9 (search, tags), Tasks F10 (task search) |
| Student 5 | Tasks F11 (drag and drop), Snippets F12 (edit/delete), deployment |

---

## Individual apps

Each team member assembled their own version of the app under `apps/` — importing directly from the shared packages with no new feature logic added at the app level.
