import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";

import Image from "next/image";
import { LoginForm } from "@/lib/components/pages/login/LoginForm";
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

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md -mt-40">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/logo220x48.png"
              alt="Redline Logo"
              width={220}
              height={48}
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            Sign in to your account
          </CardTitle>
          <CardDescription>
            Enter your email and password to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
}
