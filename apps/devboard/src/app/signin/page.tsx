"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthForm, useAuth } from "@devboard/auth";

export default function SignInPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, router, user]);

  if (loading) {
    return <div className="min-h-screen" />;
  }

  return <AuthForm />;
}
