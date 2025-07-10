import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";

import Image from "next/image";
import { Metadata } from "next";
import { SignupForm } from "../../lib/components/pages/signup/SignupForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sign Up | REDLINE Fire Watch Staffing",
    description:
      "Create a REDLINE account to get professional fire watch staffing solutions and protect your business with ease.",
    icons: {
      icon: "/images/favicon.ico",
      shortcut: "/images/favicon.png",
      apple: "/images/logo180.png",
    },
    openGraph: {
      title: "Sign Up | REDLINE Fire Watch Staffing",
      description:
        "Join REDLINE today and ensure your fire watch staffing and safety compliance needs are covered.",
    },
  };
}

export default function SignUpPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md -mt-40">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4 relative">
            <Image
              src="/images/logo220x48.png"
              alt="Redline Logo"
              width={220}
              height={48}
            />
          </div>

          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>

          <CardDescription>Sign up to get started</CardDescription>
        </CardHeader>

        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </main>
  );
}
