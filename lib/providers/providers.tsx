"use client";
import { Toaster } from "@/lib/components/ui/sonner";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";

import { AuthProvider } from "./auth-context";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <AuthProvider>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
      <Toaster />
    </AuthProvider>
  );
}
