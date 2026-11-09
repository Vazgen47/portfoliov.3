/**
 * Contact form delivery.
 *
 * Integration points (configure in `.env`, see `.env.example`):
 *   A) Firebase / Cloud Firestore  -> VITE_FIREBASE_* variables
 *   B) Any HTTPS endpoint (POST JSON) -> VITE_CONTACT_ENDPOINT
 *
 * If neither is configured this module THROWS `ContactNotConfiguredError`.
 * The UI then shows an error state — a message is never reported as delivered unless it was.
 */
export class ContactNotConfiguredError extends Error {
  constructor() {
    super('Contact form is not configured. Set VITE_FIREBASE_* or VITE_CONTACT_ENDPOINT in your .env file.');
    this.name = 'ContactNotConfiguredError';
  }
}

const env = import.meta.env;

export const isContactConfigured = () =>
  Boolean((env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID) || env.VITE_CONTACT_ENDPOINT);

async function sendViaFirebase(payload) {
  // Loaded on demand so Firebase never weighs down the initial page load.
  const [{ initializeApp, getApps, getApp }, { getFirestore, collection, addDoc, serverTimestamp }] = await Promise.all([
    import('firebase/app'),
    import('firebase/firestore'),
  ]);

  const config = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID,
  };

  const app = getApps().length ? getApp() : initializeApp(config);
  const db = getFirestore(app);
  const name = env.VITE_FIREBASE_CONTACT_COLLECTION || 'contactMessages';
  await addDoc(collection(db, name), { ...payload, createdAt: serverTimestamp(), source: 'mkheyan.agency' });
}

async function sendViaEndpoint(payload) {
  const response = await fetch(env.VITE_CONTACT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...payload, source: 'mkheyan.agency' }),
  });
  if (!response.ok) throw new Error(`Contact endpoint responded with HTTP ${response.status}`);
}

/** @param {{name:string,email:string,service:string,message:string,lang:string}} payload */
export async function sendContactMessage(payload) {
  if (env.VITE_FIREBASE_API_KEY && env.VITE_FIREBASE_PROJECT_ID) {
    await sendViaFirebase(payload);
    return { provider: 'firebase' };
  }
  if (env.VITE_CONTACT_ENDPOINT) {
    await sendViaEndpoint(payload);
    return { provider: 'endpoint' };
  }
  throw new ContactNotConfiguredError();
}
