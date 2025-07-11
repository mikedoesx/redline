import { z } from "zod"
import { FormValidationMessages, FormFieldLabels, FormFieldPlaceholders } from "./validation-messages"
import { PageTitles, PageDescriptions } from "@/lib/types/ui-messages"
import {
  USER_TYPE_LABELS,
  CERTIFICATION_LABELS,
  AVAILABILITY_LABELS,
  INDUSTRY_TYPE_LABELS,
  SHIFT_LENGTH_LABELS,
  FREQUENCY_LABELS,
  ADMIN_LEVEL_LABELS,
  SERVICE_AREA_LABELS,
  JURISDICTION_TYPE_LABELS,
  AUTHORITY_LEVEL_LABELS,
  CONTACT_METHOD_LABELS,
  TIMEZONE_LABELS,
  NOTIFICATION_LABELS,
} from "@/lib/constants/form-options"

export type StepStatus = "draft" | "pending" | "under-review" | "approved" | "needs-rework" | "complete"

export interface FormField {
  name: string
  label: string
  type: "text" | "email" | "tel" | "select" | "multiselect" | "textarea" | "checkbox" | "radio" | "number" | "date"
  placeholder?: string
  required?: boolean
  options?: { value: string; label: string }[]
  validation?: z.ZodSchema<any>
  description?: string
  conditional?: {
    field: string
    value: string | string[]
  }
}

export interface FormStep {
  id: string
  title: string
  description: string
  fields: FormField[]
  requiresReview: boolean // Whether this step needs admin review
  order: number // Order in the sequence
  dependencies?: string[] // Step IDs that must be complete before this step
  isTemplate?: boolean // Whether this is a pre-built template
  createdBy?: string // Admin who created this step
  createdAt?: Date
  updatedAt?: Date
}

export interface StepProgress {
  stepId: string
  status: StepStatus
  data: Record<string, any>
  submittedAt?: Date
  reviewedAt?: Date
  reviewedBy?: string
  reviewNotes?: string
  completedAt?: Date
}

// Base validation schemas
const phoneValidation = z.string().regex(/^\+?[\d\s\-()]+$/, FormValidationMessages.INVALID_PHONE_FORMAT)
const nameValidation = z
  .string()
  .min(2, FormValidationMessages.NAME_MIN_LENGTH)
  .max(50, FormValidationMessages.NAME_MAX_LENGTH)
const requiredString = z.string().min(1, FormValidationMessages.FIELD_REQUIRED)

// Step 1: Basic Information (same for all users)
const basicInfoStep: FormStep = {
  id: "basic-info",
  title: PageTitles.BASIC_INFO,
  description: PageDescriptions.BASIC_INFO,
  order: 1,
  requiresReview: false,
  fields: [
    {
      name: "firstName",
      label: FormFieldLabels.FIRST_NAME,
      type: "text",
      placeholder: FormFieldPlaceholders.FIRST_NAME,
      required: true,
      validation: nameValidation,
    },
    {
      name: "lastName",
      label: FormFieldLabels.LAST_NAME,
      type: "text",
      placeholder: FormFieldPlaceholders.LAST_NAME,
      required: true,
      validation: nameValidation,
    },
    {
      name: "email",
      label: FormFieldLabels.EMAIL,
      type: "email",
      placeholder: FormFieldPlaceholders.EMAIL,
      required: true,
      validation: z.string().email(FormValidationMessages.INVALID_EMAIL),
    },
    {
      name: "phoneNumber",
      label: FormFieldLabels.PHONE_NUMBER,
      type: "tel",
      placeholder: FormFieldPlaceholders.PHONE_NUMBER,
      required: true,
      validation: phoneValidation,
    },
    {
      name: "userType",
      label: FormFieldLabels.USER_TYPE,
      type: "select",
      required: true,
      options: Object.entries(USER_TYPE_LABELS).map(([value, label]) => ({ value, label })),
      validation: requiredString,
    },
  ],
}

// Step 2: User Type Specific Information
const fireWatchStep: FormStep = {
  id: "fire-watch-info",
  title: PageTitles.FIRE_WATCH_INFO,
  description: PageDescriptions.FIRE_WATCH_INFO,
  order: 2,
  requiresReview: true, // Requires admin review for certification verification
  dependencies: ["basic-info"],
  fields: [
    {
      name: "yearsExperience",
      label: FormFieldLabels.YEARS_EXPERIENCE,
      type: "number",
      placeholder: FormFieldPlaceholders.YEARS_EXPERIENCE,
      required: true,
      validation: z
        .number()
        .min(0, FormValidationMessages.EXPERIENCE_NEGATIVE)
        .max(50, FormValidationMessages.EXPERIENCE_MAX),
    },
    {
      name: "certifications",
      label: FormFieldLabels.CERTIFICATIONS,
      type: "multiselect",
      required: true,
      options: Object.entries(CERTIFICATION_LABELS).map(([value, label]) => ({ value, label })),
    },
    {
      name: "availability",
      label: FormFieldLabels.AVAILABILITY,
      type: "multiselect",
      required: true,
      options: Object.entries(AVAILABILITY_LABELS).map(([value, label]) => ({ value, label })),
    },
    {
      name: "serviceRadius",
      label: FormFieldLabels.SERVICE_RADIUS,
      type: "number",
      placeholder: FormFieldPlaceholders.SERVICE_RADIUS,
      required: true,
      validation: z
        .number()
        .min(1, FormValidationMessages.SERVICE_RADIUS_MIN)
        .max(500, FormValidationMessages.SERVICE_RADIUS_MAX),
    },
    {
      name: "hourlyRate",
      label: FormFieldLabels.HOURLY_RATE,
      type: "number",
      placeholder: FormFieldPlaceholders.HOURLY_RATE,
      required: true,
      validation: z
        .number()
        .min(15, FormValidationMessages.HOURLY_RATE_MIN)
        .max(200, FormValidationMessages.HOURLY_RATE_MAX),
    },
  ],
}

const fireWatchClientStep: FormStep = {
  id: "fire-watch-client-info",
  title: PageTitles.CLIENT_INFO,
  description: PageDescriptions.CLIENT_INFO,
  order: 2,
  requiresReview: false,
  dependencies: ["basic-info"],
  fields: [
    {
      name: "companyName",
      label: FormFieldLabels.COMPANY_NAME,
      type: "text",
      placeholder: FormFieldPlaceholders.COMPANY_NAME,
      required: true,
      validation: requiredString,
    },
    {
      name: "industryType",
      label: FormFieldLabels.INDUSTRY_TYPE,
      type: "select",
      required: true,
      options: Object.entries(INDUSTRY_TYPE_LABELS).map(([value, label]) => ({ value, label })),
      validation: requiredString,
    },
    {
      name: "facilitySize",
      label: FormFieldLabels.FACILITY_SIZE,
      type: "number",
      placeholder: FormFieldPlaceholders.FACILITY_SIZE,
      required: true,
      validation: z.number().min(100, FormValidationMessages.FACILITY_SIZE_MIN),
    },
    {
      name: "typicalShiftLength",
      label: FormFieldLabels.TYPICAL_SHIFT_LENGTH,
      type: "select",
      required: true,
      options: Object.entries(SHIFT_LENGTH_LABELS).map(([value, label]) => ({ value, label })),
      validation: requiredString,
    },
    {
      name: "frequencyNeeded",
      label: FormFieldLabels.FREQUENCY_NEEDED,
      type: "select",
      required: true,
      options: Object.entries(FREQUENCY_LABELS).map(([value, label]) => ({ value, label })),
      validation: requiredString,
    },
  ],
}

const fireWatchAdminStep: FormStep = {
  id: "fire-watch-admin-info",
  title: PageTitles.ADMIN_INFO,
  description: PageDescriptions.ADMIN_INFO,
  order: 2,
  requiresReview: true, // Requires admin review for permission verification
  dependencies: ["basic-info"],
  fields: [
    {
      name: "organizationName",
      label: FormFieldLabels.ORGANIZATION_NAME,
      type: "text",
      placeholder: FormFieldPlaceholders.ORGANIZATION_NAME,
      required: true,
      validation: requiredString,
    },
    {
      name: "adminLevel",
      label: FormFieldLabels.ADMIN_LEVEL,
      type: "select",
      required: true,
      options: Object.entries(ADMIN_LEVEL_LABELS).map(([value, label]) => ({ value, label })),
      validation: requiredString,
    },
    {
      name: "managedStaff",
      label: FormFieldLabels.MANAGED_STAFF,
      type: "number",
      placeholder: FormFieldPlaceholders.MANAGED_STAFF,
      required: true,
      validation: z.number().min(1, FormValidationMessages.MANAGED_STAFF_MIN),
    },
    {
      name: "serviceAreas",
      label: FormFieldLabels.SERVICE_AREAS,
      type: "multiselect",
      required: true,
      options: Object.entries(SERVICE_AREA_LABELS).map(([value, label]) => ({ value, label })),
    },
    {
      name: "yearsInManagement",
      label: FormFieldLabels.YEARS_IN_MANAGEMENT,
      type: "number",
      placeholder: FormFieldPlaceholders.YEARS_IN_MANAGEMENT,
      required: true,
      validation: z.number().min(0, FormValidationMessages.YEARS_NEGATIVE).max(50, FormValidationMessages.YEARS_MAX),
    },
  ],
}

const ahjOfficialStep: FormStep = {
  id: "ahj-official-info",
  title: PageTitles.AHJ_INFO,
  description: PageDescriptions.AHJ_INFO,
  order: 2,
  requiresReview: true, // Requires admin review for authority verification
  dependencies: ["basic-info"],
  fields: [
    {
      name: "jurisdiction",
      label: FormFieldLabels.JURISDICTION,
      type: "text",
      placeholder: FormFieldPlaceholders.JURISDICTION,
      required: true,
      validation: requiredString,
    },
    {
      name: "position",
      label: FormFieldLabels.POSITION,
      type: "text",
      placeholder: FormFieldPlaceholders.POSITION,
      required: true,
      validation: requiredString,
    },
    {
      name: "badgeNumber",
      label: FormFieldLabels.BADGE_NUMBER,
      type: "text",
      placeholder: FormFieldPlaceholders.BADGE_NUMBER,
      required: true,
      validation: requiredString,
    },
    {
      name: "jurisdictionType",
      label: FormFieldLabels.JURISDICTION_TYPE,
      type: "select",
      required: true,
      options: Object.entries(JURISDICTION_TYPE_LABELS).map(([value, label]) => ({ value, label })),
      validation: requiredString,
    },
    {
      name: "authorityLevel",
      label: FormFieldLabels.AUTHORITY_LEVEL,
      type: "multiselect",
      required: true,
      options: Object.entries(AUTHORITY_LEVEL_LABELS).map(([value, label]) => ({ value, label })),
    },
    {
      name: "yearsInPosition",
      label: FormFieldLabels.YEARS_IN_POSITION,
      type: "number",
      placeholder: FormFieldPlaceholders.YEARS_IN_POSITION,
      required: true,
      validation: z.number().min(0, FormValidationMessages.YEARS_NEGATIVE).max(50, FormValidationMessages.YEARS_MAX),
    },
  ],
}

// Step 3: Contact & Preferences (same for all users)
const contactPreferencesStep: FormStep = {
  id: "contact-preferences",
  title: PageTitles.CONTACT_PREFERENCES,
  description: PageDescriptions.CONTACT_PREFERENCES,
  order: 3,
  requiresReview: false,
  dependencies: ["basic-info"],
  fields: [
    {
      name: "preferredContactMethod",
      label: FormFieldLabels.PREFERRED_CONTACT_METHOD,
      type: "radio",
      required: true,
      options: Object.entries(CONTACT_METHOD_LABELS).map(([value, label]) => ({ value, label })),
      validation: requiredString,
    },
    {
      name: "timezone",
      label: FormFieldLabels.TIMEZONE,
      type: "select",
      required: true,
      options: Object.entries(TIMEZONE_LABELS).map(([value, label]) => ({ value, label })),
      validation: requiredString,
    },
    {
      name: "notifications",
      label: FormFieldLabels.NOTIFICATIONS,
      type: "multiselect",
      options: Object.entries(NOTIFICATION_LABELS).map(([value, label]) => ({ value, label })),
    },
    {
      name: "emergencyContact",
      label: FormFieldLabels.EMERGENCY_CONTACT,
      type: "text",
      placeholder: FormFieldPlaceholders.EMERGENCY_CONTACT,
      validation: nameValidation,
    },
    {
      name: "emergencyContactPhone",
      label: FormFieldLabels.EMERGENCY_CONTACT_PHONE,
      type: "tel",
      placeholder: FormFieldPlaceholders.EMERGENCY_CONTACT_PHONE,
      validation: phoneValidation,
    },
  ],
}

export const formStepsConfig = {
  "basic-info": basicInfoStep,
  "fire-watch": fireWatchStep,
  "fire-watch-client": fireWatchClientStep,
  "fire-watch-admin": fireWatchAdminStep,
  "ahj-official": ahjOfficialStep,
  "contact-preferences": contactPreferencesStep,
}

export const getStepsForUserType = (userType: string): FormStep[] => {
  const steps = [basicInfoStep]

  switch (userType) {
    case "fire-watch":
      steps.push(fireWatchStep)
      break
    case "fire-watch-client":
      steps.push(fireWatchClientStep)
      break
    case "fire-watch-admin":
      steps.push(fireWatchAdminStep)
      break
    case "ahj-official":
      steps.push(ahjOfficialStep)
      break
    default:
      // Default to fire-watch if no user type specified
      steps.push(fireWatchStep)
      break
  }

  steps.push(contactPreferencesStep)
  return steps.sort((a, b) => a.order - b.order)
}

// Helper functions for step status management
export const getStepStatusColor = (status: StepStatus): string => {
  switch (status) {
    case "draft":
      return "text-gray-500"
    case "pending":
      return "text-blue-500"
    case "under-review":
      return "text-yellow-500"
    case "approved":
      return "text-green-500"
    case "needs-rework":
      return "text-red-500"
    case "complete":
      return "text-green-600"
    default:
      return "text-gray-500"
  }
}

export const getStepStatusLabel = (status: StepStatus): string => {
  switch (status) {
    case "draft":
      return "Draft"
    case "pending":
      return "Pending Review"
    case "under-review":
      return "Under Review"
    case "approved":
      return "Approved"
    case "needs-rework":
      return "Needs Rework"
    case "complete":
      return "Complete"
    default:
      return "Unknown"
  }
}

export const canEditStep = (status: StepStatus): boolean => {
  return ["draft", "needs-rework"].includes(status)
}

export const isStepComplete = (status: StepStatus): boolean => {
  return ["approved", "complete"].includes(status)
}
