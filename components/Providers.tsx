"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes";
import { Theme } from "@radix-ui/themes";
import { SessionProvider } from "next-auth/react";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SessionProvider>
      <NextThemesProvider {...props}>
        <Theme accentColor="red">{children}</Theme>
      </NextThemesProvider>
    </SessionProvider>
  );
}
