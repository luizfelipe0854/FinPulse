import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth, type User as FirebaseUser  } from "firebase/auth"
import { app } from "@/services/firebase/config";

type AppUser = {
  id: string;
  name: string | null;
  email: string | null;
};

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextType);

const auth = getAuth(app);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
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
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};