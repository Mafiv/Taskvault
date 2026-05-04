"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { getFirebaseAuth, setFirebaseConfig, type FirebaseClientConfig } from "./firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({
  children,
  firebaseConfig,
}: {
  children: React.ReactNode;
  firebaseConfig?: FirebaseClientConfig;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  if (firebaseConfig) {
    setFirebaseConfig(firebaseConfig);
  }

  useEffect(() => {
    // getFirebaseAuth() is called inside useEffect so it only runs on the client
    const auth = getFirebaseAuth(firebaseConfig);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [firebaseConfig]);

  const signOut = async () => {
    await firebaseSignOut(getFirebaseAuth(firebaseConfig));
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
