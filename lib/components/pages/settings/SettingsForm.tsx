"use client"

import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { type Dispatch, type SetStateAction, useEffect, useState } from "react"
import { type FormStep, getStepsForUserType } from "@/lib/form-validators/form-steps"
import {
  type UserSettings,
  getUserSettings,
  markSettingsComplete,
  saveUserSettings,
} from "@/lib/services/user-settings"

import { Button } from "../../ui/button"
import { DynamicFormField } from "../../forms/DynamicFormField"
import { Form } from "../../ui/form"
import { SettingsNeedToLogin } from "./SettingsNeedToLogin"
import { SettingsPageLoading } from "./SettingsPageLoading"
import type { User } from "firebase/auth"
import { toast } from "sonner"
import { useAuth } from "@/lib/providers/auth-context"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface SettingsFormProps {
  steps: FormStep[]
  setSteps: Dispatch<SetStateAction<FormStep[]>>
  stepSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>
  currentStep: FormStep
  currentStepIndex: number
  setCurrentStepIndex: Dispatch<SetStateAction<number>>
}

export const SettingsForm = ({
  steps,
  setSteps,
  stepSchema,
  currentStep,
  currentStepIndex,
  setCurrentStepIndex,
}: SettingsFormProps) => {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialDataLoaded, setInitialDataLoaded] = useState(false)
  const isLastStep = currentStepIndex === steps.length - 1

  const form = useForm({
    resolver: zodResolver(stepSchema),
    mode: "onChange",
  })

  const nextStep = async () => {
    const isValid = await form.trigger()
    if (!isValid) return

    // Save current step data
    const currentData = form.getValues()
    if (user) {
      try {
        await saveUserSettings(user.uid, currentData)
        toast.success("Progress saved!")
      } catch (error) {
        toast.error("Failed to save progress")
        return
      }
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const onSubmit = async (data: any) => {
    if (!user) return
    setIsSubmitting(true)

    try {
      // Save the final step data
      await saveUserSettings(user.uid, data)

      // Mark settings as complete
      await markSettingsComplete(user.uid)

      toast.success("Profile setup complete! Welcome to REDLINE.")

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving settings:", error)
      toast.error("Failed to save settings. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const populateFormWithExistingData = (existingSettings: UserSettings) => {
    Object.keys(existingSettings).forEach((key) => {
      if (existingSettings[key as keyof typeof existingSettings] !== undefined) {
        form.setValue(key, existingSettings[key as keyof typeof existingSettings])
      }
    })
  }

  const setEmailFromAuth = (user: User) => {
    if (user.email) {
      form.setValue("email", user.email)
    }
  }

  const determineUserSteps = (existingSettings: UserSettings) => {
    // Determine steps based on user type
    if (existingSettings.userType) {
      const userSteps = getStepsForUserType(existingSettings.userType)
      setSteps(userSteps)
    } else {
      // Start with basic info step
      setSteps(getStepsForUserType("fire-watch"))
    }
  }

  // Load existing user settings
  useEffect(() => {
    const loadUserSettings = async () => {
      if (!user || initialDataLoaded) return
      setIsLoading(true)

      try {
        const existingSettings = await getUserSettings(user.uid)
        if (existingSettings) {
          populateFormWithExistingData(existingSettings)
          determineUserSteps(existingSettings)
          if (!existingSettings.email) {
            setEmailFromAuth(user)
          }
        } else {
          setEmailFromAuth(user)
          setSteps(getStepsForUserType("fire-watch"))
        }
        setInitialDataLoaded(true)
      } catch (error) {
        console.error("Error loading user settings:", error)
        toast.error("Failed to load existing settings")
        setSteps(getStepsForUserType(""))
        setEmailFromAuth(user)
        setInitialDataLoaded(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserSettings()
  }, [user, form, initialDataLoaded, setSteps])

  // Update steps when user type changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "userType" && value.userType) {
        const newSteps = getStepsForUserType(value.userType)
        setSteps(newSteps)

        // If we're past the basic info step, reset to step 1 (user type specific step)
        if (currentStepIndex > 0) {
          setCurrentStepIndex(1)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [form, currentStepIndex, setSteps, setCurrentStepIndex])

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading settings...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <SettingsNeedToLogin />
  }

  if (steps.length === 0) {
    return <SettingsPageLoading />
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Dynamic Fields */}
        <div className="space-y-4">
          {currentStep.fields.map((field) => (
            <DynamicFormField key={field.name} control={form.control} field={field} />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={prevStep} disabled={currentStepIndex === 0}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {isLastStep ? (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Completing Setup...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Complete Setup
                </>
              )}
            </Button>
          ) : (
            <Button type="button" onClick={nextStep}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
