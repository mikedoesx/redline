"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { Theme } from "@radix-ui/themes";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  User,
  browserSessionPersistence,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";

import { auth } from "../services/firebase";

interface AuthContextProps {
  user: User | null | undefined; // undefined = still loading
}

const AuthContext = createContext<AuthContextProps>({ user: undefined });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    setPersistence(auth, browserSessionPersistence);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export const useUser = () => useContext(AuthContext);

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <AuthProvider>
      <NextThemesProvider {...props}>
        <Theme accentColor="red">{children}</Theme>
      </NextThemesProvider>
    </AuthProvider>
  );
}
