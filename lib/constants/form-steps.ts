import {
  ADMIN_LEVEL_LABELS,
  AUTHORITY_LEVEL_LABELS,
  AVAILABILITY_LABELS,
  CERTIFICATION_LABELS,
  CONTACT_METHOD_LABELS,
  FREQUENCY_LABELS,
  INDUSTRY_TYPE_LABELS,
  JURISDICTION_TYPE_LABELS,
  NOTIFICATION_LABELS,
  SERVICE_AREA_LABELS,
  SHIFT_LENGTH_LABELS,
  TIMEZONE_LABELS,
  USER_TYPE_LABELS,
  UserTypeOptions,
} from "@/lib/constants/form-options";
import { PageDescriptions, PageTitles } from "@/lib/types/ui-messages";

import { FormMessages } from "../form-validators/validation-messages";
import { z } from "zod";

export enum TemplateStatus {
  active = "active",
  archive = "archive",
  draft = "draft",
}

export const templateStatusColorMap: Record<string, string> = {
  active: "bg-green-100 text-green-800",
  draft: "bg-yellow-100 text-yellow-800",
  archived: "bg-gray-100 text-gray-800",
};

export enum StepStatus {
  draft = "draft",
  pending = "pending",
  underReview = "under-review",
  approved = "approved",
  needsRework = "needs-rework",
  complete = "complete",
}

const stepStatusVariantMap: Record<
  StepStatus,
  "secondary" | "warning" | "success" | "destructive" | "info"
> = {
  [StepStatus.draft]: "secondary",
  [StepStatus.pending]: "warning",
  [StepStatus["underReview"]]: "info",
  [StepStatus.approved]: "success",
  [StepStatus.needsRework]: "destructive",
  [StepStatus.complete]: "success",
};

export enum FormFieldType {
  text = "text",
  email = "email",
  tel = "tel",
  select = "select",
  textarea = "textarea",
  number = "number",
  date = "date",
  multiselect = "multiselect",
  checkbox = "checkbox",
  radio = "radio",
}

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder: string;
  required: boolean;
  options: FormFieldOption[];
  description: string;
  isDisabled: boolean;
  conditional: {
    field: string;
    value: string | string[];
  };
  validation?: z.ZodSchema<any>;
}

export const INITIAL_FORM_FIELD: FormField = {
  name: "",
  label: "",
  type: FormFieldType.text,
  placeholder: "",
  required: false,
  options: [],
  description: "",
  isDisabled: false,
  conditional: {
    field: "",
    value: "",
  },
  validation: undefined,
};

export interface FormStep {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  requiresReview: boolean; // Whether this step needs admin review
  order: number; // Order in the sequence
  dependencies: string[]; // Step IDs that must be complete before this step
  isTemplate?: boolean; // Whether this is a pre-built template
  createdBy?: string; // Admin who created this step
  createdAt?: Date;
  updatedAt?: Date;
}

export const INITIAL_FORM_STEP: FormStep = {
  id: "",
  title: "",
  description: "",
  fields: [],
  requiresReview: false,
  order: 0,
  dependencies: [],
};

export interface StepProgress {
  stepId: string;
  status: StepStatus;
  data: Record<string, any>;
  submittedAt?: Date | null;
  reviewedAt?: Date | null;
  reviewedBy?: string;
  reviewNotes?: string;
  completedAt?: Date | null;
}

// Base validation schemas
const phoneValidation = z
  .string()
  .regex(/^\+?[\d\s\-()]+$/, FormMessages.INVALID_PHONE);
const nameValidation = z
  .string()
  .min(2, FormMessages.NAME_TOO_SHORT)
  .max(50, FormMessages.NAME_TOO_LONG);
const requiredString = z.string().min(1, FormMessages.REQUIRED);

// Create dynamic schema for current step
export const createStepSchema = (stepConfig: FormStep) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  stepConfig.fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case FormFieldType.email:
        fieldSchema = z.string().email(FormMessages.INVALID_EMAIL);
        break;
      case FormFieldType.tel:
        fieldSchema = z.string().min(10, FormMessages.INVALID_PHONE);
        break;
      case FormFieldType.number:
        fieldSchema = z.coerce.number().min(0, FormMessages.NEGATIVE_NUMBER);
        break;
      case FormFieldType.multiselect:
        fieldSchema = z
          .array(z.string())
          .min(1, "Please select at least one option");
        break;
      case FormFieldType.select:
      case FormFieldType.radio:
        fieldSchema = z.string().min(1, "Please select an option");
        break;
      default:
        fieldSchema = z.string().min(1, "This field is required");
    }

    if (!field.required) {
      fieldSchema = fieldSchema.optional();
    }

    schemaFields[field.name] = fieldSchema;
  });

  return z.object(schemaFields);
};

export enum FormFieldLabels {
  // Basic Info
  FIRST_NAME = "First Name",
  LAST_NAME = "Last Name",
  EMAIL = "Email Address",
  PHONE_NUMBER = "Phone Number",
  USER_TYPE = "User Type",

  // Fire Watch Professional
  YEARS_EXPERIENCE = "Years of Experience",
  CERTIFICATIONS = "Certifications",
  AVAILABILITY = "Availability",
  SERVICE_RADIUS = "Service Radius (miles)",
  HOURLY_RATE = "Hourly Rate ($)",

  // Client Info
  COMPANY_NAME = "Company Name",
  INDUSTRY_TYPE = "Industry Type",
  FACILITY_SIZE = "Facility Size (sq ft)",
  TYPICAL_SHIFT_LENGTH = "Typical Shift Length",
  FREQUENCY_NEEDED = "How often do you need fire watch services?",

  // Admin Info
  ORGANIZATION_NAME = "Organization Name",
  ADMIN_LEVEL = "Administrator Level",
  MANAGED_STAFF = "Number of Staff Managed",
  SERVICE_AREAS = "Service Areas",
  YEARS_IN_MANAGEMENT = "Years in Management",

  // AHJ Official
  JURISDICTION = "Jurisdiction",
  POSITION = "Position/Title",
  BADGE_NUMBER = "Badge/ID Number",
  JURISDICTION_TYPE = "Jurisdiction Type",
  AUTHORITY_LEVEL = "Authority Level",
  YEARS_IN_POSITION = "Years in Current Position",

  // Contact Preferences
  PREFERRED_CONTACT_METHOD = "Preferred Contact Method",
  TIMEZONE = "Time Zone",
  NOTIFICATIONS = "Notification Preferences",
  EMERGENCY_CONTACT = "Emergency Contact Name",
  EMERGENCY_CONTACT_PHONE = "Emergency Contact Phone",
}

export enum FormFieldPlaceholders {
  // Basic Info
  FIRST_NAME = "Enter your first name",
  LAST_NAME = "Enter your last name",
  EMAIL = "your.email@example.com",
  PHONE_NUMBER = "+1 (555) 123-4567",

  // Professional Info
  YEARS_EXPERIENCE = "0",
  SERVICE_RADIUS = "25",
  HOURLY_RATE = "25.00",

  // Client Info
  COMPANY_NAME = "Your Company Name",
  FACILITY_SIZE = "10000",

  // Admin Info
  ORGANIZATION_NAME = "Fire Watch Services Inc.",
  MANAGED_STAFF = "10",
  YEARS_IN_MANAGEMENT = "5",

  // AHJ Official
  JURISDICTION = "City of Springfield Fire Department",
  POSITION = "Fire Marshal",
  BADGE_NUMBER = "FM-12345",
  YEARS_IN_POSITION = "3",

  // Contact Preferences
  EMERGENCY_CONTACT = "John Doe",
  EMERGENCY_CONTACT_PHONE = "+1 (555) 123-4567",
}

// Step 1: Basic Information (same for all users)
const basicInfoStep: FormStep = {
  id: "basic-info",
  title: PageTitles.BASIC_INFO,
  description: PageDescriptions.BASIC_INFO,
  order: 1,
  requiresReview: false,
  dependencies: [],
  fields: [
    {
      name: "firstName",
      label: FormFieldLabels.FIRST_NAME,
      type: FormFieldType.text,
      placeholder: FormFieldPlaceholders.FIRST_NAME,
      required: true,
      validation: nameValidation,
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "lastName",
      label: FormFieldLabels.LAST_NAME,
      type: FormFieldType.text,
      placeholder: FormFieldPlaceholders.LAST_NAME,
      required: true,
      validation: nameValidation,
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "email",
      label: FormFieldLabels.EMAIL,
      type: FormFieldType.email,
      placeholder: FormFieldPlaceholders.EMAIL,
      required: true,
      isDisabled: true,
      validation: z.string().email(FormMessages.INVALID_EMAIL),
      options: [],
      description: "",
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "phoneNumber",
      label: FormFieldLabels.PHONE_NUMBER,
      type: FormFieldType.tel,
      placeholder: FormFieldPlaceholders.PHONE_NUMBER,
      required: true,
      validation: phoneValidation,
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "userType",
      label: FormFieldLabels.USER_TYPE,
      type: FormFieldType.select,
      required: true,
      options: Object.entries(USER_TYPE_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
      validation: requiredString,
      placeholder: "",
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
  ],
};

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
      type: FormFieldType.number,
      placeholder: FormFieldPlaceholders.YEARS_EXPERIENCE,
      required: true,
      validation: z
        .number()
        .min(0, FormMessages.NEGATIVE_NUMBER)
        .max(50, FormMessages.OVER_MAX),
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "certifications",
      label: FormFieldLabels.CERTIFICATIONS,
      type: FormFieldType.multiselect,
      required: true,
      options: Object.entries(CERTIFICATION_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
      placeholder: "",
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "availability",
      label: FormFieldLabels.AVAILABILITY,
      type: FormFieldType.multiselect,
      required: true,
      options: Object.entries(AVAILABILITY_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
      placeholder: "",
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "serviceRadius",
      label: FormFieldLabels.SERVICE_RADIUS,
      type: FormFieldType.number,
      placeholder: FormFieldPlaceholders.SERVICE_RADIUS,
      required: true,
      validation: z
        .number()
        .min(1, FormMessages.SERVICE_RADIUS_MIN)
        .max(500, FormMessages.SERVICE_RADIUS_MAX),
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "hourlyRate",
      label: FormFieldLabels.HOURLY_RATE,
      type: FormFieldType.number,
      placeholder: FormFieldPlaceholders.HOURLY_RATE,
      required: true,
      validation: z
        .number()
        .min(15, FormMessages.HOURLY_RATE_MIN)
        .max(200, FormMessages.HOURLY_RATE_MAX),
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
  ],
};

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
      type: FormFieldType.text,
      placeholder: FormFieldPlaceholders.COMPANY_NAME,
      required: true,
      validation: requiredString,
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "industryType",
      label: FormFieldLabels.INDUSTRY_TYPE,
      type: FormFieldType.select,
      required: true,
      options: Object.entries(INDUSTRY_TYPE_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
      validation: requiredString,
      placeholder: "",
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "facilitySize",
      label: FormFieldLabels.FACILITY_SIZE,
      type: FormFieldType.number,
      placeholder: FormFieldPlaceholders.FACILITY_SIZE,
      required: true,
      validation: z.number().min(100, FormMessages.FACILITY_SIZE_MIN),
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "typicalShiftLength",
      label: FormFieldLabels.TYPICAL_SHIFT_LENGTH,
      type: FormFieldType.select,
      required: true,
      options: Object.entries(SHIFT_LENGTH_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
      validation: requiredString,
      placeholder: "",
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "frequencyNeeded",
      label: FormFieldLabels.FREQUENCY_NEEDED,
      type: FormFieldType.select,
      required: true,
      options: Object.entries(FREQUENCY_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
      validation: requiredString,
      placeholder: "",
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
  ],
};

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
      type: FormFieldType.text,
      placeholder: FormFieldPlaceholders.ORGANIZATION_NAME,
      required: true,
      validation: requiredString,
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "adminLevel",
      label: FormFieldLabels.ADMIN_LEVEL,
      type: FormFieldType.select,
      required: true,
      options: Object.entries(ADMIN_LEVEL_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
      validation: requiredString,
      placeholder: "",
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "managedStaff",
      label: FormFieldLabels.MANAGED_STAFF,
      type: FormFieldType.number,
      placeholder: FormFieldPlaceholders.MANAGED_STAFF,
      required: true,
      validation: z.number().min(1, FormMessages.MANAGED_STAFF_MIN),
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "serviceAreas",
      label: FormFieldLabels.SERVICE_AREAS,
      type: FormFieldType.multiselect,
      required: true,
      options: Object.entries(SERVICE_AREA_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
      placeholder: "",
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "yearsInManagement",
      label: FormFieldLabels.YEARS_IN_MANAGEMENT,
      type: FormFieldType.number,
      placeholder: FormFieldPlaceholders.YEARS_IN_MANAGEMENT,
      required: true,
      validation: z
        .number()
        .min(0, FormMessages.NEGATIVE_NUMBER)
        .max(50, FormMessages.OVER_MAX),
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
  ],
};

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
      type: FormFieldType.text,
      placeholder: FormFieldPlaceholders.JURISDICTION,
      required: true,
      validation: requiredString,
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "position",
      label: FormFieldLabels.POSITION,
      type: FormFieldType.text,
      placeholder: FormFieldPlaceholders.POSITION,
      required: true,
      validation: requiredString,
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "badgeNumber",
      label: FormFieldLabels.BADGE_NUMBER,
      type: FormFieldType.text,
      placeholder: FormFieldPlaceholders.BADGE_NUMBER,
      required: true,
      validation: requiredString,
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "jurisdictionType",
      label: FormFieldLabels.JURISDICTION_TYPE,
      type: FormFieldType.select,
      required: true,
      options: Object.entries(JURISDICTION_TYPE_LABELS).map(
        ([value, label]) => ({ value, label }),
      ),
      validation: requiredString,
      placeholder: "",
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "authorityLevel",
      label: FormFieldLabels.AUTHORITY_LEVEL,
      type: FormFieldType.multiselect,
      required: true,
      options: Object.entries(AUTHORITY_LEVEL_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
      placeholder: "",
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "yearsInPosition",
      label: FormFieldLabels.YEARS_IN_POSITION,
      type: FormFieldType.number,
      placeholder: FormFieldPlaceholders.YEARS_IN_POSITION,
      required: true,
      validation: z
        .number()
        .min(0, FormMessages.NEGATIVE_NUMBER)
        .max(50, FormMessages.OVER_MAX),
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
  ],
};

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
      type: FormFieldType.radio,
      required: true,
      options: Object.entries(CONTACT_METHOD_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
      validation: requiredString,
      placeholder: "",
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "timezone",
      label: FormFieldLabels.TIMEZONE,
      type: FormFieldType.select,
      required: true,
      options: Object.entries(TIMEZONE_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
      validation: requiredString,
      placeholder: "",
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "notifications",
      label: FormFieldLabels.NOTIFICATIONS,
      type: FormFieldType.multiselect,
      options: Object.entries(NOTIFICATION_LABELS).map(([value, label]) => ({
        value,
        label,
      })),
      placeholder: "",
      required: false,
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "emergencyContact",
      label: FormFieldLabels.EMERGENCY_CONTACT,
      type: FormFieldType.text,
      placeholder: FormFieldPlaceholders.EMERGENCY_CONTACT,
      validation: nameValidation,
      required: false,
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
    {
      name: "emergencyContactPhone",
      label: FormFieldLabels.EMERGENCY_CONTACT_PHONE,
      type: FormFieldType.tel,
      placeholder: FormFieldPlaceholders.EMERGENCY_CONTACT_PHONE,
      validation: phoneValidation,
      required: false,
      options: [],
      description: "",
      isDisabled: false,
      conditional: {
        field: "",
        value: "",
      },
    },
  ],
};

export const formStepsConfig = {
  "basic-info": basicInfoStep,
  [UserTypeOptions.FIRE_WATCH]: fireWatchStep,
  [UserTypeOptions.FIRE_WATCH_CLIENT]: fireWatchClientStep,
  [UserTypeOptions.FIRE_WATCH_ADMIN]: fireWatchAdminStep,
  [UserTypeOptions.AHJ_OFFICIAL]: ahjOfficialStep,
  "contact-preferences": contactPreferencesStep,
};

export const getStepsForUserType = (userType: string): FormStep[] => {
  const steps = [basicInfoStep];

  switch (userType) {
    case UserTypeOptions.FIRE_WATCH:
      steps.push(fireWatchStep);
      break;
    case UserTypeOptions.FIRE_WATCH_CLIENT:
      steps.push(fireWatchClientStep);
      break;
    case UserTypeOptions.FIRE_WATCH_ADMIN:
      steps.push(fireWatchAdminStep);
      break;
    case UserTypeOptions.AHJ_OFFICIAL:
      steps.push(ahjOfficialStep);
      break;
    default:
      // Default to fire-watch if no user type specified
      steps.push(fireWatchStep);
      break;
  }

  steps.push(contactPreferencesStep);
  return steps.sort((a, b) => a.order - b.order);
};

// Helper functions for step status management
export const getStepStatusColor = (status: StepStatus): string => {
  switch (status) {
    case StepStatus.pending:
      return "text-muted-foreground";
    case StepStatus.pending:
      return "text-blue-500";
    case StepStatus.underReview:
      return "text-yellow-500";
    case StepStatus.approved:
      return "text-green-500";
    case StepStatus.needsRework:
      return "text-red-500";
    case StepStatus.complete:
      return "text-green-600";
    default:
      return "text-muted-foreground";
  }
};

export const getStepStatusLabel = (status: StepStatus): string => {
  switch (status) {
    case StepStatus.pending:
      return "Draft";
    case StepStatus.pending:
      return "Pending Review";
    case StepStatus.underReview:
      return "Under Review";
    case StepStatus.approved:
      return "Approved";
    case StepStatus.needsRework:
      return "Needs Rework";
    case StepStatus.complete:
      return "Complete";
    default:
      return "Unknown";
  }
};

export const canEditStep = (status: StepStatus): boolean => {
  return [
    StepStatus.pending,
    StepStatus.needsRework,
    StepStatus.pending,
  ].includes(status);
};

export const isStepComplete = (status: StepStatus): boolean => {
  return [StepStatus.approved, StepStatus.complete].includes(status);
};
