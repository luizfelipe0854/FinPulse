import { createContext, useContext } from "react";

export type AppUser = {
  id: string;
  name: string | null;
  email: string | null;
};

type AuthContextType = {
  user: AppUser | null;
  loading: boolean;
  logout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);
