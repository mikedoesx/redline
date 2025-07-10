"use client";

import { Alert, AlertDescription } from "../../ui/alert";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { AuthService } from "@/lib/services/auth";
import { Label } from "../../ui/label";
import { auth } from "@/lib/services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/providers/providers";

export const LoginForm = () => {
  const { user } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const authService = AuthService.getInstance();

  useEffect(() => {
    console.log(
      "%c🤪 ~ file: LoginForm.tsx:26 [] -> user : ",
      "color: #eb3910",
      auth.currentUser
    );
    console.log(
      "%c🤪 ~ file: LoginForm.tsx:31 [] -> user : ",
      "color: #e5ba9",
      user
    );
    if (user) {
      router.push("/dashboard");
    }
  }, [router]);

  const onForgotPassword = async () => {
    setIsLoading(true);
    setError("");

    if (!email) {
      setError("Enter a valid email");
      setIsLoading(false);
      return;
    }

    await sendPasswordResetEmail(auth, email);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const res = await authService.login(email, password);

    if (res?.error) {
      setError(res.error);
      setIsLoading(false);
    } else {
      console.log(res);
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <Box>
        <Label htmlFor="email">Email address</Label>
        <TextField.Root
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Box>

      <Box>
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <TextField.Root
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="absolute right-0 top-0 h-full px-3 py-2">
            <Button
              type="button"
              variant="ghost"
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
      </Box>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Flex gap="2" justify="between">
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
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </Flex>

      <Flex direction="column" gap="2" justify="center" align="center">
        <Button
          variant="ghost"
          type="submit"
          disabled={isLoading}
          onClick={() => onForgotPassword()}
        >
          Forgot your password?
        </Button>

        <Button
          variant="ghost"
          disabled={isLoading}
          onClick={() => router.push("/signup")}
        >
          Need to signup?
        </Button>
      </Flex>
    </form>
  );
};
