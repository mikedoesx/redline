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

import { AuthErrors } from "@/lib/types/error-messages";
import { AuthSuccess } from "@/lib/types/success-messages";
import { Button } from "../../ui/button";
import { FormMessages } from "@/lib/form-validators/validation-messages";
import { Input } from "../../ui/input";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { UserProfileService } from "@/lib/services/user-profile";
import { auth } from "@/lib/services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
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

  const onSubmit = async (data: LoginFormData) => {
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
        router.push("/profile");
      } else {
        toast.success(AuthSuccess.WELCOME);
        router.push("/dashboard");
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {LoadingStates.SIGNING_IN}
              </>
            ) : (
              ButtonLabels.SIGN_IN
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">
          {LinkTexts.DONT_HAVE_ACCOUNT}
        </span>
        <Link href="/signup" className="text-blue-600 hover:underline">
          {LinkTexts.SIGN_UP}
        </Link>
      </div>

      <div className="mt-4 text-center">
        <Link
          href="/forgot-password"
          className="text-sm text-blue-600 hover:underline"
        >
          {LinkTexts.FORGOT_PASSWORD}
        </Link>
      </div>
    </>
  );
};
