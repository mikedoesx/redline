"use client"

import { useState } from "react"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/lib/components/ui/card"
import { SettingsProgressHeader } from "./SettingsProgressHeader"
import { SettingsForm } from "./SettingsForm"
import { getStepsForUserType, type FormStep } from "@/lib/form-validators/form-steps"

export const SettingsPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [steps, setSteps] = useState<FormStep[]>(() => getStepsForUserType(""))

  // Create dynamic schema based on current step
  const createStepSchema = (step: FormStep) => {
    const schemaFields: Record<string, z.ZodSchema<any>> = {}

    step.fields.forEach((field) => {
      if (field.validation) {
        schemaFields[field.name] = field.required ? field.validation : field.validation.optional()
      } else {
        // Default validation
        const baseSchema =
          field.type === "number" ? z.number() : field.type === "multiselect" ? z.array(z.string()) : z.string()

        schemaFields[field.name] = field.required ? baseSchema : baseSchema.optional()
      }
    })

    return z.object(schemaFields)
  }

  const currentStep = steps[currentStepIndex] || steps[0]
  const stepSchema = currentStep ? createStepSchema(currentStep) : z.object({})

  if (!currentStep) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Loading...</h2>
          <p className="text-muted-foreground">Setting up your profile...</p>
        </div>
      </div>
    )
  }

  const progress = ((currentStepIndex + 1) / steps.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <SettingsProgressHeader currentStepIndex={currentStepIndex} totalSteps={steps.length} progress={progress} />

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>{currentStep.title}</CardTitle>
            <CardDescription>{currentStep.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <SettingsForm
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
