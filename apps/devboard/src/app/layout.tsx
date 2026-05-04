import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@devboard/auth";

export const metadata: Metadata = {
  title: "DevBoard",
  description: "Developer productivity dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };

  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen antialiased">
        <AuthProvider firebaseConfig={firebaseConfig}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
