"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button, Flex, Link as RadixLink } from "@radix-ui/themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Button as UIButton } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, name, password }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md -mt-40">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4 relative">
            <Image
              src="/images/logo295x48.png"
              alt="Redline Logo"
              width={200}
              height={32}
              className="h-8 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription>Sign up to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <UIButton
                  type="button"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </UIButton>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm Password</Label>
              <Input
                id="confirm"
                type={showPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              style={{ width: "100%" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing up...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <Flex className="my-2" justify={"center"}>
            <RadixLink asChild>
              <Link href="/">Go back</Link>
            </RadixLink>
          </Flex>
        </CardContent>
      </Card>
    </div>
  );
}
