import { SnippetVault } from "@devboard/snippetvault";
import { ProtectedRoute, AppShell } from "@devboard/auth";

export default function SnippetsPage() {
  return (
    <ProtectedRoute>
      <AppShell>
        <SnippetVault />
      </AppShell>
    </ProtectedRoute>
  );
}
