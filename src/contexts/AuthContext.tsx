import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { AuthContext, type AppUser } from "@/hooks/useAuth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
          });
        } else {
          setUser(null);
        }

        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  const refreshUser = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        id: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
