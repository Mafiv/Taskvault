"use client";

import React from "react";
import { useAuth } from "./provider";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return <>{children}</>;
  }

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-8">
          <span className="font-bold text-indigo-600 text-xl tracking-tight">DevBoard</span>
          <div className="flex items-center gap-1">
            <a href="/" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">Tasks</a>
            <a href="/snippets" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">Snippets</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {(user.displayName ?? user.email)?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-gray-700">{user.displayName ?? user.email}</span>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
          >
            Sign out
          </button>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-8 py-8">
        {children}
      </main>
    </>
  );
}
