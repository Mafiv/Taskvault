import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taskvault",
  description: "Developer productivity dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen antialiased">
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-6 sticky top-0 z-40">
          <span className="font-bold text-indigo-600 text-lg tracking-tight">Taskvault</span>
          <a href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Tasks</a>
          <a href="/snippets" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Snippets</a>
        </nav>
        <main className="max-w-7xl mx-auto px-6 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
