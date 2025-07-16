import { LoginPage } from "./LoginPage";
import { Metadata } from "next";
import type React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Login | REDLINE Fire Watch Staffing",
    description:
      "Login to your REDLINE account to manage fire watch schedules, staffing, and safety compliance.",
    icons: {
      icon: "/images/favicon.ico",
      shortcut: "/images/favicon.png",
      apple: "/images/logo180.png",
    },
    openGraph: {
      title: "Login | REDLINE Fire Watch Staffing",
      description:
        "Sign in securely to your REDLINE fire watch staffing dashboard.",
    },
  };
}

export default function Login() {
  return <LoginPage />;
}
