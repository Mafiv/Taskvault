import { KanbanBoard } from "@devboard/kanban";
import { ProtectedRoute, AppShell } from "@devboard/auth";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AppShell rightNavItems={<ThemeToggle />}>
        <KanbanBoard />
      </AppShell>
    </ProtectedRoute>
  );
}
