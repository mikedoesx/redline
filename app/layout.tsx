import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "@/lib/providers/providers";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "REDLINE Fire Watch Staffing Solutions",
  description:
    "Professional fire watch staffing and safety compliance solutions",
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.png",
    apple: "/images/logo180.png",
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
