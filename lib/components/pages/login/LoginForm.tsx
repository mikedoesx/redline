"use client"

import { Button } from "../../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { Loader2 } from "lucide-react"
import { getUserProfile } from "@/lib/services/user-profile"
import Link from "next/link"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/services/firebase"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthErrorMessages } from "@/lib/types/error-messages"
import { AuthSuccessMessages } from "@/lib/types/success-messages"
import { FormValidationMessages } from "@/lib/form-validators/validation-messages"
import { PageTitles, PageDescriptions, LoadingMessages, ButtonLabels, LinkTexts } from "@/lib/types/ui-messages"

const loginSchema = z.object({
  email: z.string().email(FormValidationMessages.INVALID_EMAIL),
  password: z.string().min(6, FormValidationMessages.PASSWORD_MIN_LENGTH),
})

type LoginFormData = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password)
      const user = userCredential.user

      // Check if user has completed profile setup
      const userProfile = await getUserProfile(user.uid)

      if (!userProfile || !userProfile.isComplete) {
        toast.success(AuthSuccessMessages.WELCOME_BACK_COMPLETE_PROFILE)
        router.push("/profile")
      } else {
        toast.success(AuthSuccessMessages.WELCOME_BACK)
        router.push("/dashboard")
      }
    } catch (error: any) {
      console.error("Login error:", error)

      let errorMessage = AuthErrorMessages.GENERIC_SIGNIN_ERROR

      if (error.code === "auth/user-not-found") {
        errorMessage = AuthErrorMessages.USER_NOT_FOUND
      } else if (error.code === "auth/wrong-password") {
        errorMessage = AuthErrorMessages.WRONG_PASSWORD
      } else if (error.code === "auth/invalid-email") {
        errorMessage = AuthErrorMessages.INVALID_EMAIL
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = AuthErrorMessages.TOO_MANY_REQUESTS
      }

      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>{PageTitles.LOGIN}</CardTitle>
          <CardDescription>{PageDescriptions.LOGIN}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
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
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {LoadingMessages.SIGNING_IN}
                  </>
                ) : (
                  ButtonLabels.SIGN_IN
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">{LinkTexts.DONT_HAVE_ACCOUNT}</span>
            <Link href="/signup" className="text-blue-600 hover:underline">
              {LinkTexts.SIGN_UP_LINK}
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              {LinkTexts.FORGOT_PASSWORD}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
