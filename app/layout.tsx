import "./globals.css";
import "@radix-ui/themes/styles.css";

import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "REDLINE | Firewatch Staffing Solutions",
  description:
    "REDLINE provides full-service fire watch staffing solutions to protect your business and ensure compliance with fire safety regulations.",
  generator: "v0.dev",
  keywords: [
    "fire watch",
    "firewatch staffing",
    "fire safety",
    "fire watch services",
    "REDLINE",
  ],
  authors: [
    {
      name: "REDLINE Firewatch Staffing Solutions",
      url: "https://yourdomain.com",
    },
  ],
  creator: "REDLINE",
  publisher: "REDLINE",
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.png",
    apple: "/images/logo180.png",
  },
  openGraph: {
    title: "REDLINE | Firewatch Staffing Solutions",
    description:
      "Professional fire watch staffing services to protect your site and meet safety compliance.",
    url: "https://redline.com",
    siteName: "REDLINE",
    images: [
      {
        url: "/images/logo1200x200",
        width: 1200,
        height: 200,
        alt: "REDLINE Firewatch Staffing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REDLINE | Firewatch Staffing Solutions",
    description:
      "Professional fire watch staffing services to protect your site and meet safety compliance.",
    images: ["/images/logo1200x200.png"],
    creator: "@YourTwitterHandle",
  },
  metadataBase: new URL("https://redline.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <AppHeader />
          {children}
          <AppFooter />
        </Providers>
      </body>
    </html>
  );
}
