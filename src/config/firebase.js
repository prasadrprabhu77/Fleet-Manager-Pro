// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzrb7ZaLNGXzZ-kVu5g9JVkMVgqz_mW8Y",
  authDomain: "logistics-7ffd1.firebaseapp.com",
  projectId: "logistics-7ffd1",
  storageBucket: "logistics-7ffd1.firebasestorage.app",
  messagingSenderId: "906351814300",
  appId: "1:906351814300:web:65bcaa088b580ce5642f59",
  measurementId: "G-BNGW4RTE9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);