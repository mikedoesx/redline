import { HomePage } from "@/lib/components/pages/home/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "REDLINE Fire Watch",
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
      name: "REDLINE Fire Watch",
      url: "https://redlinefirewatch.com",
    },
  ],
  creator: "REDLINE Fire Watch",
  publisher: "REDLINE Fire Watch",
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.png",
    apple: "/images/logo180.png",
  },
  openGraph: {
    title: "REDLINE Fire Watch",
    description:
      "Professional fire watch staffing services to protect your site and meet safety compliance.",
    url: "https://redlinefirewatch.com",
    siteName: "REDLINE",
    images: [
      {
        url: "/images/socialcard1200x360",
        width: 1200,
        height: 200,
        alt: "REDLINE Firewatch",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REDLINE Fire Watch",
    description:
      "Professional fire watch staffing services to protect your site and meet safety compliance.",
    images: ["/images/socialcard1200x360.png"],
    creator: "@redlinefirewatch",
  },
  metadataBase: new URL("https://redline.com"),
};

export default function Home() {
  return <HomePage />;
}
