import "./globals.css";
import "@radix-ui/themes/styles.css";

import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "REDLINE | Firewatch Staffing Solutions",
  description: "Full staffing solutions for REDLINE fire watch.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AppHeader />
          {children}
          <AppFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
