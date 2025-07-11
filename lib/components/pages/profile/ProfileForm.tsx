"use client"

import { Check, ChevronLeft, ChevronRight, Clock, Loader2, AlertCircle } from "lucide-react"
import { type Dispatch, type SetStateAction, useEffect, useState } from "react"
import {
  type FormStep,
  getStepsForUserType,
  canEditStep,
  getStepStatusLabel,
  type StepStatus,
} from "@/lib/form-validators/form-steps"
import {
  type UserProfile,
  getUserProfile,
  markProfileComplete,
  saveStepProgress,
  getNextIncompleteStep,
  canProceedToNextStep,
  getStepValidationErrors,
} from "@/lib/services/user-profile"

import { Button } from "../../ui/button"
import { DynamicFormField } from "../../forms/DynamicFormField"
import { Form } from "../../ui/form"
import { ProfileNeedToLogin } from "./ProfileNeedToLogin"
import { ProfilePageLoading } from "./ProfilePageLoading"
import { Alert, AlertDescription } from "../../ui/alert"
import { Badge } from "../../ui/badge"
import type { User } from "firebase/auth"
import { toast } from "sonner"
import { useAuth } from "@/lib/providers/auth-context"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import type { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProfileErrorMessages } from "@/lib/types/error-messages"
import { ProfileSuccessMessages } from "@/lib/types/success-messages"
import { LoadingMessages, ButtonLabels, StatusMessages } from "@/lib/types/ui-messages"

interface ProfileFormProps {
  steps: FormStep[]
  setSteps: Dispatch<SetStateAction<FormStep[]>>
  stepSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>
  currentStep: FormStep
  currentStepIndex: number
  setCurrentStepIndex: Dispatch<SetStateAction<number>>
}

export const ProfileForm = ({
  steps,
  setSteps,
  stepSchema,
  currentStep,
  currentStepIndex,
  setCurrentStepIndex,
}: ProfileFormProps) => {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialDataLoaded, setInitialDataLoaded] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [stepErrors, setStepErrors] = useState<string[]>([])

  const isLastStep = currentStepIndex === steps.length - 1
  const currentStepProgress = userProfile?.stepProgress[currentStep.id]
  const currentStepStatus = currentStepProgress?.status || "draft"
  const canEdit = canEditStep(currentStepStatus)

  const form = useForm({
    resolver: zodResolver(stepSchema),
    mode: "onChange",
  })

  const saveCurrentStep = async (data: Record<string, any>, status: StepStatus = "draft") => {
    if (!user) return false

    try {
      await saveStepProgress(user.uid, currentStep.id, data, status)

      // Update local state
      if (userProfile) {
        const updatedProfile = {
          ...userProfile,
          ...data,
          stepProgress: {
            ...userProfile.stepProgress,
            [currentStep.id]: {
              stepId: currentStep.id,
              status,
              data,
              submittedAt: status === "pending" ? new Date() : undefined,
            },
          },
        }
        setUserProfile(updatedProfile)
      }

      return true
    } catch (error) {
      console.error("Error saving step:", error)
      toast.error(ProfileErrorMessages.SAVE_FAILED)
      return false
    }
  }

  const nextStep = async () => {
    const isValid = await form.trigger()
    if (!isValid) return

    const currentData = form.getValues()

    // Determine status based on whether step requires review
    const status: StepStatus = currentStep.requiresReview ? "pending" : "approved"

    const saved = await saveCurrentStep(currentData, status)
    if (!saved) return

    if (status === "pending") {
      toast.success(ProfileSuccessMessages.STEP_SUBMITTED_REVIEW)
    } else {
      toast.success(ProfileSuccessMessages.STEP_COMPLETED)
    }

    // Move to next step if available
    if (currentStepIndex < steps.length - 1) {
      const nextStepId = steps[currentStepIndex + 1].id

      // Check if we can proceed to next step
      if (userProfile && !canProceedToNextStep(userProfile, currentStep.id, nextStepId)) {
        toast.warning(ProfileErrorMessages.WAIT_FOR_APPROVAL)
        return
      }

      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const onSubmit = async (data: any) => {
    if (!user || !userProfile) return
    setIsSubmitting(true)

    try {
      // Save the final step
      const status: StepStatus = currentStep.requiresReview ? "pending" : "complete"
      const saved = await saveCurrentStep(data, status)

      if (!saved) {
        setIsSubmitting(false)
        return
      }

      // Check if all steps are complete
      const allStepsComplete = steps.every((step) => {
        const stepProgress = userProfile.stepProgress[step.id]
        return stepProgress && ["approved", "complete"].includes(stepProgress.status)
      })

      if (allStepsComplete) {
        await markProfileComplete(user.uid)
        toast.success(ProfileSuccessMessages.PROFILE_COMPLETE)
        router.push("/dashboard")
      } else {
        toast.success(ProfileSuccessMessages.FINAL_STEP_SUBMITTED)
        // Stay on the form to show status
      }
    } catch (error) {
      console.error("Error completing profile:", error)
      toast.error(ProfileErrorMessages.COMPLETE_PROFILE_FAILED)
    } finally {
      setIsSubmitting(false)
    }
  }

  const populateFormWithExistingData = (existingProfile: UserProfile) => {
    // Populate with step-specific data if available
    const stepData = existingProfile.stepProgress[currentStep.id]?.data
    if (stepData) {
      Object.keys(stepData).forEach((key) => {
        if (stepData[key] !== undefined) {
          form.setValue(key, stepData[key])
        }
      })
    } else {
      // Fallback to main profile data
      Object.keys(existingProfile).forEach((key) => {
        if (existingProfile[key as keyof typeof existingProfile] !== undefined) {
          form.setValue(key, existingProfile[key as keyof typeof existingProfile])
        }
      })
    }
  }

  const setEmailFromAuth = (user: User) => {
    if (user.email) {
      form.setValue("email", user.email)
    }
  }

  const determineUserSteps = (existingProfile: UserProfile) => {
    if (existingProfile.userType) {
      const userSteps = getStepsForUserType(existingProfile.userType)
      setSteps(userSteps)

      // Find the next incomplete step
      const stepIds = userSteps.map((s) => s.id)
      const nextIncompleteStep = getNextIncompleteStep(existingProfile, stepIds)

      if (nextIncompleteStep) {
        const stepIndex = userSteps.findIndex((s) => s.id === nextIncompleteStep)
        if (stepIndex >= 0) {
          setCurrentStepIndex(stepIndex)
        }
      }
    } else {
      setSteps(getStepsForUserType("fire-watch"))
    }
  }

  // Load existing user profile
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user || initialDataLoaded) return
      setIsLoading(true)

      try {
        const existingProfile = await getUserProfile(user.uid)
        if (existingProfile) {
          setUserProfile(existingProfile)
          determineUserSteps(existingProfile)
          populateFormWithExistingData(existingProfile)

          if (!existingProfile.email) {
            setEmailFromAuth(user)
          }
        } else {
          setEmailFromAuth(user)
          setSteps(getStepsForUserType("fire-watch"))
        }
        setInitialDataLoaded(true)
      } catch (error) {
        console.error("Error loading user profile:", error)
        toast.error(ProfileErrorMessages.LOAD_FAILED)
        setSteps(getStepsForUserType(""))
        setEmailFromAuth(user)
        setInitialDataLoaded(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [user, initialDataLoaded, setSteps])

  // Update form data when step changes
  useEffect(() => {
    if (userProfile && currentStep) {
      populateFormWithExistingData(userProfile)

      // Get validation errors for current step
      const errors = getStepValidationErrors(userProfile, currentStep.id)
      setStepErrors(errors)
    }
  }, [currentStep, userProfile, form])

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
          <span>{LoadingMessages.LOADING_PROFILE}</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <ProfileNeedToLogin />
  }

  if (steps.length === 0) {
    return <ProfilePageLoading />
  }

  return (
    <div className="space-y-6">
      {/* Step Status Indicators */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {steps.map((step, index) => {
            const stepProgress = userProfile?.stepProgress[step.id]
            const status = stepProgress?.status || "draft"
            const isCurrentStep = index === currentStepIndex
            const isCompleted = ["approved", "complete"].includes(status)
            const isPending = status === "pending"

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    isCurrentStep
                      ? "border-blue-500 bg-blue-500 text-white"
                      : isCompleted
                        ? "border-green-500 bg-green-500 text-white"
                        : isPending
                          ? "border-yellow-500 bg-yellow-500 text-white"
                          : "border-gray-300 bg-white text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : isPending ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />
                )}
              </div>
            )
          })}
        </div>

        {/* Current Step Status */}
        <div className="flex items-center space-x-2">
          <Badge
            variant={
              currentStepStatus === "approved" || currentStepStatus === "complete"
                ? "default"
                : currentStepStatus === "pending"
                  ? "secondary"
                  : currentStepStatus === "needs-rework"
                    ? "destructive"
                    : "outline"
            }
          >
            {getStepStatusLabel(currentStepStatus)}
          </Badge>
          {currentStep.requiresReview && (
            <span className="text-sm text-gray-500">{StatusMessages.REQUIRES_REVIEW}</span>
          )}
        </div>
      </div>

      {/* Step Validation Errors */}
      {stepErrors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {stepErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{currentStep.title}</h2>
          <p className="text-gray-600 mt-2">{currentStep.description}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentStep.fields.map((field) => (
                <DynamicFormField key={field.name} field={field} form={form} disabled={!canEdit} />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStepIndex === 0 || isSubmitting}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                {ButtonLabels.PREVIOUS}
              </Button>

              <div className="flex space-x-3">
                {!isLastStep ? (
                  <Button type="button" onClick={nextStep} disabled={isSubmitting || !canEdit}>
                    {currentStep.requiresReview ? ButtonLabels.SUBMIT_REVIEW : ButtonLabels.SAVE_CONTINUE}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting || !canEdit}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {LoadingMessages.COMPLETING_SETUP}
                      </>
                    ) : (
                      ButtonLabels.COMPLETE_SETUP
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
