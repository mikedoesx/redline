import { Metadata } from "next";
import type React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Settings | REDLINE Fire Watch Staffing",
    description:
      "Create your REDLINE Fire Watch settings profile to manage fire watch schedules, or staffing and safety compliance.",
    icons: {
      icon: "/images/favicon.ico",
      shortcut: "/images/favicon.png",
      apple: "/images/logo180.png",
    },
    openGraph: {
      title: "Settings | REDLINE Fire Watch Staffing",
      description: "Create your REDLINE Fire Watch settings profile",
    },
  };
}

export default function Settings() {
  return <main>Settings screen works!</main>;
}
