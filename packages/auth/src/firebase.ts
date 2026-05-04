import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

export type FirebaseClientConfig = FirebaseOptions;

let configuredFirebaseConfig: FirebaseClientConfig | undefined;

function readFirebaseConfigFromEnv(): FirebaseClientConfig {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
}

function validateFirebaseConfig(config: FirebaseClientConfig): void {
  const requiredKeys: Array<keyof FirebaseClientConfig> = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId",
  ];

  const missingKeys = requiredKeys.filter((key) => !config[key]);
  if (missingKeys.length > 0) {
    throw new Error(
      `Firebase is not configured correctly. Missing: ${missingKeys.join(", ")}. ` +
      "Set NEXT_PUBLIC_FIREBASE_* values in apps/devboard/.env.local or pass firebaseConfig to AuthProvider."
    );
  }
}

export function setFirebaseConfig(config: FirebaseClientConfig): void {
  configuredFirebaseConfig = config;
}

function resolveFirebaseConfig(overrideConfig?: FirebaseClientConfig): FirebaseClientConfig {
  const config = overrideConfig ?? configuredFirebaseConfig ?? readFirebaseConfigFromEnv();
  validateFirebaseConfig(config);
  return config;
}

let appInitialized = false;

// Auth must be retrieved lazily — getAuth can fail in SSR/Node context
let _auth: Auth | undefined;
export function getFirebaseAuth(config?: FirebaseClientConfig): Auth {
  if (typeof window === "undefined") {
    throw new Error("Firebase auth can only be used in the browser.");
  }

  if (!appInitialized) {
    const resolvedConfig = resolveFirebaseConfig(config);
    if (getApps().length === 0) {
      initializeApp(resolvedConfig);
    } else {
      getApp();
    }
    appInitialized = true;
  }

  if (!_auth) {
    _auth = getAuth(getApp());
  }
  return _auth;
}
