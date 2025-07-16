"use client";

import { AuthProvider } from "./auth-context";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { ThemeProviderProps } from "next-themes";
import { Toaster } from "@/lib/components/ui/sonner";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <AuthProvider>
      <ThemeProvider {...props}>{children}</ThemeProvider>
      <Toaster />
    </AuthProvider>
  );
}
