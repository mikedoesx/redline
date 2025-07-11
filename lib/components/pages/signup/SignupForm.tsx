"use client";

import { Alert, AlertDescription } from "@/lib/components/ui/alert";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { AuthService } from "@/lib/services/auth";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "@/lib/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignUpForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const authService = AuthService.getInstance();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const res = await authService.register(email, password);

    if (res?.error) {
      setError(res.error);
      setIsLoading(false);
    } else {
      console.log(res);
      router.push("/profile");
      router.refresh();
    }
  };
  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div>
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

      <div>
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
          <Button
            type="button"
            variant="ghost"
            className="absolute right-0 top-0 h-full px-3 py-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div>
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

      <div className="flex gap-2 justify-between">
        <Button
          style={{ flex: 1 }}
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => router.push("/")}
        >
          Home
        </Button>

        <Button style={{ flex: 1 }} type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing up...
            </>
          ) : (
            "Signup"
          )}
        </Button>
      </div>

      <div className="flex justify-center">
        <Link href="/login">Already have an account?</Link>
      </div>
    </form>
  );
};
