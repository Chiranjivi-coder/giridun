import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: "AIzaSyAOb7ZSuLdSgpBQfU86kY1BO_TxV1Y0JzM",
  authDomain: "giridhan.firebaseapp.com",
  projectId: "giridhan",
  storageBucket: "giridhan.firebasestorage.app",
  messagingSenderId: "438979827685",
  appId: "1:438979827685:web:2859389bc7fbc3fe69c10c",
  measurementId: "G-47N1X7FR5C",
};

// Initialize Firebase
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let analytics: Analytics | null = null;

export const initAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window !== "undefined" && (await isSupported())) {
    if (!analytics) {
      analytics = getAnalytics(app);
    }
    return analytics;
  }
  return null;
};
