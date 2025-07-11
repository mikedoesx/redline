"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/ui/card"
import { type FormStep, getStepsForUserType, type StepStatus } from "@/lib/form-validators/form-steps"
import { useEffect, useState } from "react"

import { ProfileForm } from "./ProfileForm"
import { ProfileNeedToLogin } from "./ProfileNeedToLogin"
import { ProfilePageLoading } from "./ProfilePageLoading"
import { ProfileProgressHeader } from "./ProfileProgressHeader"
import { useAuth } from "@/lib/providers/auth-context"
import { getUserProfile, type UserProfile } from "@/lib/services/user-profile"
import { z } from "zod"

export const ProfilePage = () => {
  const { user, loading } = useAuth()
  const [steps, setSteps] = useState<FormStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  // Initialize with default steps
  useEffect(() => {
    if (!steps.length) {
      setSteps(getStepsForUserType("fire-watch"))
    }
  }, [steps.length])

  // Load user profile to get step statuses
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return

      try {
        const profile = await getUserProfile(user.uid)
        setUserProfile(profile)
      } catch (error) {
        console.error("Error loading profile:", error)
      }
    }

    loadProfile()
  }, [user])

  if (loading) {
    return <ProfilePageLoading />
  }

  if (!user) {
    return <ProfileNeedToLogin />
  }

  if (steps.length === 0) {
    return <ProfilePageLoading />
  }

  const currentStep = steps[currentStepIndex]
  const progress = ((currentStepIndex + 1) / steps.length) * 100

  // Create dynamic schema for current step
  const createStepSchema = (stepConfig: FormStep) => {
    const schemaFields: Record<string, z.ZodTypeAny> = {}

    stepConfig.fields.forEach((field) => {
      let fieldSchema: z.ZodTypeAny

      switch (field.type) {
        case "email":
          fieldSchema = z.string().email("Please enter a valid email address")
          break
        case "tel":
          fieldSchema = z.string().min(10, "Please enter a valid phone number")
          break
        case "number":
          fieldSchema = z.coerce.number().min(0, "Please enter a valid number")
          break
        case "multiselect":
          fieldSchema = z.array(z.string()).min(1, "Please select at least one option")
          break
        case "select":
        case "radio":
          fieldSchema = z.string().min(1, "Please select an option")
          break
        default:
          fieldSchema = z.string().min(1, "This field is required")
      }

      if (!field.required) {
        fieldSchema = fieldSchema.optional()
      }

      schemaFields[field.name] = fieldSchema
    })

    return z.object(schemaFields)
  }

  const stepSchema = createStepSchema(currentStep)

  // Get step statuses for progress header
  const stepStatuses: Record<string, StepStatus> = {}
  const stepIds = steps.map((step) => step.id)

  if (userProfile) {
    stepIds.forEach((stepId) => {
      stepStatuses[stepId] = userProfile.stepProgress[stepId]?.status || "draft"
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <ProfileProgressHeader
          currentStepIndex={currentStepIndex}
          totalSteps={steps.length}
          progress={progress}
          stepStatuses={stepStatuses}
          stepIds={stepIds}
        />

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{currentStep.title}</CardTitle>
            {currentStep.description && <p className="text-gray-600">{currentStep.description}</p>}
          </CardHeader>
          <CardContent>
            <ProfileForm
              steps={steps}
              setSteps={setSteps}
              stepSchema={stepSchema}
              currentStep={currentStep}
              currentStepIndex={currentStepIndex}
              setCurrentStepIndex={setCurrentStepIndex}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
