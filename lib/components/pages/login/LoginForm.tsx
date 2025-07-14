"use client";

import {
  ButtonLabels,
  LinkTexts,
  LoadingStates,
} from "@/lib/types/ui-messages";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { appleProvider, auth, googleProvider } from "@/lib/services/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { AuthErrors } from "@/lib/types/error-messages";
import { AuthSuccess } from "@/lib/types/success-messages";
import { Button } from "../../ui/button";
import { FormMessages } from "@/lib/form-validators/validation-messages";
import { Input } from "../../ui/input";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { LoginWithGoogleButton } from "./LoginWithGoogleButton";
import { UserProfileService } from "@/lib/services/user-profile";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email(FormMessages.INVALID_EMAIL),
  password: z.string().min(6, FormMessages.PASSWORD_TOO_SHORT),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const userProfileService = UserProfileService.getInstance();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      toast.success("Signed in with Google!");
      router.push("/dashboard");
      setIsLoading(false);
    } catch (error) {
      toast.error("Google sign-in failed");
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, appleProvider);
      const user = result.user;
      toast.success("Signed in with Apple!");
      router.push("/dashboard");
      setIsLoading(false);
    } catch (error) {
      toast.error("Apple sign-in failed");
      console.error(error);
      setIsLoading(false);
    }
  };

  const onSignInWithEmail = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;

      // Check if user has completed profile setup
      const userProfile = await userProfileService.getUserProfile(user.uid);

      if (!userProfile || !userProfile.isComplete) {
        toast.success(AuthSuccess.WELCOME_COMPLETE_PROFILE);
        router.push("/dashboard");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Login error:", error);

      let errorMessage = AuthErrors.SIGNIN_FAILED;

      if (error.code === "auth/user-not-found") {
        errorMessage = AuthErrors.USER_NOT_FOUND;
      } else if (error.code === "auth/wrong-password") {
        errorMessage = AuthErrors.WRONG_PASSWORD;
      } else if (error.code === "auth/invalid-email") {
        errorMessage = AuthErrors.INVALID_EMAIL;
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = AuthErrors.TOO_MANY_ATTEMPTS;
      }

      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSignInWithEmail)}
        className="space-y-4"
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center gap-2">
          <LoginWithGoogleButton handleGoogleLogin={handleGoogleLogin} />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {LoadingStates.SIGNING_IN}
              </>
            ) : (
              ButtonLabels.SIGN_IN
            )}
          </Button>
        </div>

        <div className="mt-2 flex flex-col items-center gap-2 text-sm">
          <Link href="/signup">{LinkTexts.DONT_HAVE_ACCOUNT}</Link>
          <Link href="/forgot-password">{LinkTexts.FORGOT_PASSWORD}</Link>
        </div>
      </form>
    </Form>
  );
};
