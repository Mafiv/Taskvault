"use client";

import React, { useState } from "react";
import { useAuth } from "./provider";

export function AppShell({ 
  children,
  rightNavItems,
}: { 
  children: React.ReactNode;
  rightNavItems?: React.ReactNode;
}) {
  const { user, loading, signOut } = useAuth();
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 dark:border-primary-400" />
      </div>
    );
  }

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <nav className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm transition-colors duration-300">
        <div className="flex items-center gap-8">
          <a href="/" className="font-bold text-primary-600 dark:text-primary-400 text-xl tracking-tight hover:opacity-80 transition-opacity">TaskVault</a>
          <div className="flex items-center gap-1">
            <a href="/dashboard" className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-all duration-200">Tasks</a>
            <a href="/snippets" className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-lg transition-all duration-200">Snippets</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {rightNavItems}
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 dark:bg-zinc-800 rounded-full border border-gray-100 dark:border-white/5 shadow-sm">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-sm shadow-primary-500/30">
              {(user.displayName ?? user.email)?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{user.displayName ?? user.email}</span>
          </div>
          <button
            type="button"
            onClick={() => setShowSignOutModal(true)}
            className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all duration-200"
          >
            Sign out
          </button>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-8 py-8">
        {children}
      </main>

      {showSignOutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-slide-up">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sign Out</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Are you sure you want to sign out of your account?</p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSignOutModal(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowSignOutModal(false);
                  signOut();
                }}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm shadow-red-600/20"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
