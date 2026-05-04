import { KanbanBoard } from "@devboard/kanban";
import { ProtectedRoute, AppShell } from "@devboard/auth";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <KanbanBoard />
      </AppShell>
    </ProtectedRoute>
  );
}
