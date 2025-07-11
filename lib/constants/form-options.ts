export enum UserTypeOptions {
  FIRE_WATCH = "fire-watch",
  FIRE_WATCH_CLIENT = "fire-watch-client",
  FIRE_WATCH_ADMIN = "fire-watch-admin",
  AHJ_OFFICIAL = "ahj-official",
}

export const USER_TYPE_LABELS = {
  [UserTypeOptions.FIRE_WATCH]: "Fire Watch",
  [UserTypeOptions.FIRE_WATCH_CLIENT]: "Fire Watch Client (looking for fire watchers)",
  [UserTypeOptions.FIRE_WATCH_ADMIN]: "Fire Watch Administrator",
  [UserTypeOptions.AHJ_OFFICIAL]: "AHJ Official",
} as const

export enum CertificationOptions {
  FIRE_WATCH_CERTIFIED = "fire-watch-certified",
  OSHA_10 = "osha-10",
  OSHA_30 = "osha-30",
  FIRST_AID_CPR = "first-aid-cpr",
  FIRE_EXTINGUISHER = "fire-extinguisher",
  HAZMAT = "hazmat",
}

export const CERTIFICATION_LABELS = {
  [CertificationOptions.FIRE_WATCH_CERTIFIED]: "Fire Watch Certified",
  [CertificationOptions.OSHA_10]: "OSHA 10-Hour",
  [CertificationOptions.OSHA_30]: "OSHA 30-Hour",
  [CertificationOptions.FIRST_AID_CPR]: "First Aid/CPR",
  [CertificationOptions.FIRE_EXTINGUISHER]: "Fire Extinguisher Training",
  [CertificationOptions.HAZMAT]: "HAZMAT Certified",
} as const

export enum AvailabilityOptions {
  WEEKDAYS = "weekdays",
  WEEKENDS = "weekends",
  NIGHTS = "nights",
  HOLIDAYS = "holidays",
  EMERGENCY = "emergency",
}

export const AVAILABILITY_LABELS = {
  [AvailabilityOptions.WEEKDAYS]: "Weekdays",
  [AvailabilityOptions.WEEKENDS]: "Weekends",
  [AvailabilityOptions.NIGHTS]: "Night Shifts",
  [AvailabilityOptions.HOLIDAYS]: "Holidays",
  [AvailabilityOptions.EMERGENCY]: "Emergency Calls",
} as const

export enum IndustryTypeOptions {
  CONSTRUCTION = "construction",
  MANUFACTURING = "manufacturing",
  HEALTHCARE = "healthcare",
  EDUCATION = "education",
  RETAIL = "retail",
  HOSPITALITY = "hospitality",
  OTHER = "other",
}

export const INDUSTRY_TYPE_LABELS = {
  [IndustryTypeOptions.CONSTRUCTION]: "Construction",
  [IndustryTypeOptions.MANUFACTURING]: "Manufacturing",
  [IndustryTypeOptions.HEALTHCARE]: "Healthcare",
  [IndustryTypeOptions.EDUCATION]: "Education",
  [IndustryTypeOptions.RETAIL]: "Retail",
  [IndustryTypeOptions.HOSPITALITY]: "Hospitality",
  [IndustryTypeOptions.OTHER]: "Other",
} as const

export enum ShiftLengthOptions {
  FOUR_HOURS = "4-hours",
  EIGHT_HOURS = "8-hours",
  TWELVE_HOURS = "12-hours",
  TWENTY_FOUR_HOURS = "24-hours",
  VARIABLE = "variable",
}

export const SHIFT_LENGTH_LABELS = {
  [ShiftLengthOptions.FOUR_HOURS]: "4 Hours",
  [ShiftLengthOptions.EIGHT_HOURS]: "8 Hours",
  [ShiftLengthOptions.TWELVE_HOURS]: "12 Hours",
  [ShiftLengthOptions.TWENTY_FOUR_HOURS]: "24 Hours",
  [ShiftLengthOptions.VARIABLE]: "Variable",
} as const

export enum FrequencyOptions {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  AS_NEEDED = "as-needed",
  EMERGENCY_ONLY = "emergency-only",
}

export const FREQUENCY_LABELS = {
  [FrequencyOptions.DAILY]: "Daily",
  [FrequencyOptions.WEEKLY]: "Weekly",
  [FrequencyOptions.MONTHLY]: "Monthly",
  [FrequencyOptions.AS_NEEDED]: "As Needed",
  [FrequencyOptions.EMERGENCY_ONLY]: "Emergency Only",
} as const

export enum AdminLevelOptions {
  SUPERVISOR = "supervisor",
  MANAGER = "manager",
  DIRECTOR = "director",
  OWNER = "owner",
}

export const ADMIN_LEVEL_LABELS = {
  [AdminLevelOptions.SUPERVISOR]: "Supervisor",
  [AdminLevelOptions.MANAGER]: "Manager",
  [AdminLevelOptions.DIRECTOR]: "Director",
  [AdminLevelOptions.OWNER]: "Owner",
} as const

export enum ServiceAreaOptions {
  SCHEDULING = "scheduling",
  BILLING = "billing",
  COMPLIANCE = "compliance",
  TRAINING = "training",
  QUALITY_CONTROL = "quality-control",
  CLIENT_RELATIONS = "client-relations",
}

export const SERVICE_AREA_LABELS = {
  [ServiceAreaOptions.SCHEDULING]: "Scheduling",
  [ServiceAreaOptions.BILLING]: "Billing & Invoicing",
  [ServiceAreaOptions.COMPLIANCE]: "Compliance Management",
  [ServiceAreaOptions.TRAINING]: "Training & Certification",
  [ServiceAreaOptions.QUALITY_CONTROL]: "Quality Control",
  [ServiceAreaOptions.CLIENT_RELATIONS]: "Client Relations",
} as const

export enum JurisdictionTypeOptions {
  MUNICIPAL = "municipal",
  COUNTY = "county",
  STATE = "state",
  FEDERAL = "federal",
  PRIVATE = "private",
}

export const JURISDICTION_TYPE_LABELS = {
  [JurisdictionTypeOptions.MUNICIPAL]: "Municipal Fire Department",
  [JurisdictionTypeOptions.COUNTY]: "County Fire Department",
  [JurisdictionTypeOptions.STATE]: "State Fire Marshal",
  [JurisdictionTypeOptions.FEDERAL]: "Federal Agency",
  [JurisdictionTypeOptions.PRIVATE]: "Private Fire Protection",
} as const

export enum AuthorityLevelOptions {
  PERMITS = "permits",
  INSPECTIONS = "inspections",
  ENFORCEMENT = "enforcement",
  PLAN_REVIEW = "plan-review",
  INVESTIGATION = "investigation",
}

export const AUTHORITY_LEVEL_LABELS = {
  [AuthorityLevelOptions.PERMITS]: "Permit Issuance",
  [AuthorityLevelOptions.INSPECTIONS]: "Fire Inspections",
  [AuthorityLevelOptions.ENFORCEMENT]: "Code Enforcement",
  [AuthorityLevelOptions.PLAN_REVIEW]: "Plan Review",
  [AuthorityLevelOptions.INVESTIGATION]: "Fire Investigation",
} as const

export enum ContactMethodOptions {
  EMAIL = "email",
  PHONE = "phone",
  TEXT = "text",
  APP = "app",
}

export const CONTACT_METHOD_LABELS = {
  [ContactMethodOptions.EMAIL]: "Email",
  [ContactMethodOptions.PHONE]: "Phone",
  [ContactMethodOptions.TEXT]: "Text Message",
  [ContactMethodOptions.APP]: "In-App Notifications",
} as const

export enum TimezoneOptions {
  EST = "EST",
  CST = "CST",
  MST = "MST",
  PST = "PST",
  AKST = "AKST",
  HST = "HST",
}

export const TIMEZONE_LABELS = {
  [TimezoneOptions.EST]: "Eastern Time (EST)",
  [TimezoneOptions.CST]: "Central Time (CST)",
  [TimezoneOptions.MST]: "Mountain Time (MST)",
  [TimezoneOptions.PST]: "Pacific Time (PST)",
  [TimezoneOptions.AKST]: "Alaska Time (AKST)",
  [TimezoneOptions.HST]: "Hawaii Time (HST)",
} as const

export enum NotificationOptions {
  SHIFT_REMINDERS = "shift-reminders",
  SCHEDULE_CHANGES = "schedule-changes",
  NEW_OPPORTUNITIES = "new-opportunities",
  SYSTEM_UPDATES = "system-updates",
  BILLING_ALERTS = "billing-alerts",
}

export const NOTIFICATION_LABELS = {
  [NotificationOptions.SHIFT_REMINDERS]: "Shift Reminders",
  [NotificationOptions.SCHEDULE_CHANGES]: "Schedule Changes",
  [NotificationOptions.NEW_OPPORTUNITIES]: "New Opportunities",
  [NotificationOptions.SYSTEM_UPDATES]: "System Updates",
  [NotificationOptions.BILLING_ALERTS]: "Billing Alerts",
} as const
