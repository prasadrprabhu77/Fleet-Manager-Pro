// src/context/AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔑 Register with role
  async function register(email, password, role) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", cred.user.uid), {
      email,
      role,
    });
    // Store full user in context
    setUser({ uid: cred.user.uid, email, role });
    return cred.user;
  }

  // 🔑 Login and fetch role
  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const docSnap = await getDoc(doc(db, "users", cred.user.uid));
    let role = null;
    if (docSnap.exists()) {
      role = docSnap.data().role;
    }
    const fullUser = { uid: cred.user.uid, email: cred.user.email, role };
    setUser(fullUser); // ✅ update context correctly
    return fullUser;
  }

  function logout() {
    setUser(null);
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // 🔑 Track auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docSnap = await getDoc(doc(db, "users", currentUser.uid));
        const role = docSnap.exists() ? docSnap.data().role : null;
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          role,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,         // 👉 now contains { uid, email, role }
    register,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
