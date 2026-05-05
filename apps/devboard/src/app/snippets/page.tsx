import { SnippetVault } from "@devboard/snippetvault";
import { ProtectedRoute, AppShell } from "@devboard/auth";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SnippetsPage() {
  return (
    <ProtectedRoute>
      <AppShell rightNavItems={<ThemeToggle />}>
        <SnippetVault />
      </AppShell>
    </ProtectedRoute>
  );
}
