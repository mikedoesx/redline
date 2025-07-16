import { AppUserRole } from "../types/user-profile";

export const USER_TYPE_FIELD_OPTIONS = {
  [AppUserRole.FIRE_WATCH]: "Fire Watch",
  [AppUserRole.FIRE_WATCH_CLIENT]: "Fire Watch Client",
  [AppUserRole.FIRE_WATCH_ADMIN]: "Fire Watch Administrator",
  [AppUserRole.AHJ_OFFICIAL]: "AHJ Official",
};

export enum CertificationOptions {
  FIRE_WATCH_CERTIFIED = "fire-watch-certified",
  OSHA_10 = "osha-10",
  OSHA_30 = "osha-30",
  FIRST_AID_CPR = "first-aid-cpr",
  FIRE_EXTINGUISHER = "fire-extinguisher",
  HAZMAT = "hazmat",
}

export const CERTIFICATION_FIELD_OPTIONS = {
  [CertificationOptions.FIRE_WATCH_CERTIFIED]: "Fire Watch Certified",
  [CertificationOptions.OSHA_10]: "OSHA 10-Hour",
  [CertificationOptions.OSHA_30]: "OSHA 30-Hour",
  [CertificationOptions.FIRST_AID_CPR]: "First Aid/CPR",
  [CertificationOptions.FIRE_EXTINGUISHER]: "Fire Extinguisher Training",
  [CertificationOptions.HAZMAT]: "HAZMAT Certified",
};

export enum AvailabilityOptions {
  WEEKDAYS = "weekdays",
  WEEKENDS = "weekends",
  NIGHTS = "nights",
  HOLIDAYS = "holidays",
  EMERGENCY = "emergency",
}

export const AVAILABILITY_FIELD_OPTIONS = {
  [AvailabilityOptions.WEEKDAYS]: "Weekdays",
  [AvailabilityOptions.WEEKENDS]: "Weekends",
  [AvailabilityOptions.NIGHTS]: "Night Shifts",
  [AvailabilityOptions.HOLIDAYS]: "Holidays",
  [AvailabilityOptions.EMERGENCY]: "Emergency Calls",
};

export enum IndustryTypeOptions {
  CONSTRUCTION = "construction",
  MANUFACTURING = "manufacturing",
  HEALTHCARE = "healthcare",
  EDUCATION = "education",
  RETAIL = "retail",
  HOSPITALITY = "hospitality",
  OTHER = "other",
}

export const INDUSTRY_TYPE_FIELD_OPTIONS = {
  [IndustryTypeOptions.CONSTRUCTION]: "Construction",
  [IndustryTypeOptions.MANUFACTURING]: "Manufacturing",
  [IndustryTypeOptions.HEALTHCARE]: "Healthcare",
  [IndustryTypeOptions.EDUCATION]: "Education",
  [IndustryTypeOptions.RETAIL]: "Retail",
  [IndustryTypeOptions.HOSPITALITY]: "Hospitality",
  [IndustryTypeOptions.OTHER]: "Other",
};

export enum ShiftLengthOptions {
  FOUR_HOURS = "4-hours",
  EIGHT_HOURS = "8-hours",
  TWELVE_HOURS = "12-hours",
  TWENTY_FOUR_HOURS = "24-hours",
  VARIABLE = "variable",
}

export const SHIFT_LENGTH_FIELD_OPTIONS = {
  [ShiftLengthOptions.FOUR_HOURS]: "4 Hours",
  [ShiftLengthOptions.EIGHT_HOURS]: "8 Hours",
  [ShiftLengthOptions.TWELVE_HOURS]: "12 Hours",
  [ShiftLengthOptions.TWENTY_FOUR_HOURS]: "24 Hours",
  [ShiftLengthOptions.VARIABLE]: "Variable",
};

export enum FrequencyOptions {
  DAILY = "daily",
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  AS_NEEDED = "as-needed",
  EMERGENCY_ONLY = "emergency-only",
}

export const FREQUENCY_FIELD_OPTIONS = {
  [FrequencyOptions.DAILY]: "Daily",
  [FrequencyOptions.WEEKLY]: "Weekly",
  [FrequencyOptions.MONTHLY]: "Monthly",
  [FrequencyOptions.AS_NEEDED]: "As Needed",
  [FrequencyOptions.EMERGENCY_ONLY]: "Emergency Only",
};

export enum AdminLevelOptions {
  SUPERVISOR = "supervisor",
  MANAGER = "manager",
  DIRECTOR = "director",
  OWNER = "owner",
}

export const ADMIN_LEVEL_FIELD_OPTIONS = {
  [AdminLevelOptions.SUPERVISOR]: "Supervisor",
  [AdminLevelOptions.MANAGER]: "Manager",
  [AdminLevelOptions.DIRECTOR]: "Director",
  [AdminLevelOptions.OWNER]: "Owner",
};

export enum ServiceAreaOptions {
  SCHEDULING = "scheduling",
  BILLING = "billing",
  COMPLIANCE = "compliance",
  TRAINING = "training",
  QUALITY_CONTROL = "quality-control",
  CLIENT_RELATIONS = "client-relations",
}

export const SERVICE_AREA_FIELD_OPTIONS = {
  [ServiceAreaOptions.SCHEDULING]: "Scheduling",
  [ServiceAreaOptions.BILLING]: "Billing & Invoicing",
  [ServiceAreaOptions.COMPLIANCE]: "Compliance Management",
  [ServiceAreaOptions.TRAINING]: "Training & Certification",
  [ServiceAreaOptions.QUALITY_CONTROL]: "Quality Control",
  [ServiceAreaOptions.CLIENT_RELATIONS]: "Client Relations",
};

export enum JurisdictionTypeOptions {
  MUNICIPAL = "municipal",
  COUNTY = "county",
  STATE = "state",
  FEDERAL = "federal",
  PRIVATE = "private",
}

export const JURISDICTION_TYPE_FIELD_OPTIONS = {
  [JurisdictionTypeOptions.MUNICIPAL]: "Municipal Fire Department",
  [JurisdictionTypeOptions.COUNTY]: "County Fire Department",
  [JurisdictionTypeOptions.STATE]: "State Fire Marshal",
  [JurisdictionTypeOptions.FEDERAL]: "Federal Agency",
  [JurisdictionTypeOptions.PRIVATE]: "Private Fire Protection",
};

export enum AuthorityLevelOptions {
  PERMITS = "permits",
  INSPECTIONS = "inspections",
  ENFORCEMENT = "enforcement",
  PLAN_REVIEW = "plan-review",
  INVESTIGATION = "investigation",
}

export const AUTHORITY_LEVEL_FIELD_OPTIONS = {
  [AuthorityLevelOptions.PERMITS]: "Permit Issuance",
  [AuthorityLevelOptions.INSPECTIONS]: "Fire Inspections",
  [AuthorityLevelOptions.ENFORCEMENT]: "Code Enforcement",
  [AuthorityLevelOptions.PLAN_REVIEW]: "Plan Review",
  [AuthorityLevelOptions.INVESTIGATION]: "Fire Investigation",
};

export enum ContactMethodOptions {
  EMAIL = "email",
  PHONE = "phone",
  TEXT = "text",
  APP = "app",
}

export const CONTACT_METHOD_FIELD_OPTIONS = {
  [ContactMethodOptions.EMAIL]: "Email",
  [ContactMethodOptions.PHONE]: "Phone",
  [ContactMethodOptions.TEXT]: "Text Message",
  [ContactMethodOptions.APP]: "In-App Notifications",
};

export enum TimezoneOptions {
  EST = "EST",
  CST = "CST",
  MST = "MST",
  PST = "PST",
  AKST = "AKST",
  HST = "HST",
}

export const TIMEZONE_FIELD_OPTIONS = {
  [TimezoneOptions.EST]: "Eastern Time (EST)",
  [TimezoneOptions.CST]: "Central Time (CST)",
  [TimezoneOptions.MST]: "Mountain Time (MST)",
  [TimezoneOptions.PST]: "Pacific Time (PST)",
  [TimezoneOptions.AKST]: "Alaska Time (AKST)",
  [TimezoneOptions.HST]: "Hawaii Time (HST)",
};

export enum NotificationOptions {
  SHIFT_REMINDERS = "shift-reminders",
  SCHEDULE_CHANGES = "schedule-changes",
  NEW_OPPORTUNITIES = "new-opportunities",
  SYSTEM_UPDATES = "system-updates",
  BILLING_ALERTS = "billing-alerts",
}

export const NOTIFICATION_FIELD_OPTIONS = {
  [NotificationOptions.SHIFT_REMINDERS]: "Shift Reminders",
  [NotificationOptions.SCHEDULE_CHANGES]: "Schedule Changes",
  [NotificationOptions.NEW_OPPORTUNITIES]: "New Opportunities",
  [NotificationOptions.SYSTEM_UPDATES]: "System Updates",
  [NotificationOptions.BILLING_ALERTS]: "Billing Alerts",
};

export enum US_STATES {
  Alabama = "AL",
  Alaska = "AK",
  Arizona = "AZ",
  Arkansas = "AR",
  California = "CA",
  Colorado = "CO",
  Connecticut = "CT",
  Delaware = "DE",
  Florida = "FL",
  Georgia = "GA",
  Hawaii = "HI",
  Idaho = "ID",
  Illinois = "IL",
  Indiana = "IN",
  Iowa = "IA",
  Kansas = "KS",
  Kentucky = "KY",
  Louisiana = "LA",
  Maine = "ME",
  Maryland = "MD",
  Massachusetts = "MA",
  Michigan = "MI",
  Minnesota = "MN",
  Mississippi = "MS",
  Missouri = "MO",
  Montana = "MT",
  Nebraska = "NE",
  Nevada = "NV",
  NewHampshire = "NH",
  NewJersey = "NJ",
  NewMexico = "NM",
  NewYork = "NY",
  NorthCarolina = "NC",
  NorthDakota = "ND",
  Ohio = "OH",
  Oklahoma = "OK",
  Oregon = "OR",
  Pennsylvania = "PA",
  RhodeIsland = "RI",
  SouthCarolina = "SC",
  SouthDakota = "SD",
  Tennessee = "TN",
  Texas = "TX",
  Utah = "UT",
  Vermont = "VT",
  Virginia = "VA",
  Washington = "WA",
  WestVirginia = "WV",
  Wisconsin = "WI",
  Wyoming = "WY",
}

export const US_STATE_LABELS = {
  [US_STATES.Alabama]: "Alabama",
  [US_STATES.Alaska]: "Alaska",
  [US_STATES.Arizona]: "Arizona",
  [US_STATES.Arkansas]: "Arkansas",
  [US_STATES.California]: "California",
  [US_STATES.Colorado]: "Colorado",
  [US_STATES.Connecticut]: "Connecticut",
  [US_STATES.Delaware]: "Delaware",
  [US_STATES.Florida]: "Florida",
  [US_STATES.Georgia]: "Georgia",
  [US_STATES.Hawaii]: "Hawaii",
  [US_STATES.Idaho]: "Idaho",
  [US_STATES.Illinois]: "Illinois",
  [US_STATES.Indiana]: "Indiana",
  [US_STATES.Iowa]: "Iowa",
  [US_STATES.Kansas]: "Kansas",
  [US_STATES.Kentucky]: "Kentucky",
  [US_STATES.Louisiana]: "Louisiana",
  [US_STATES.Maine]: "Maine",
  [US_STATES.Maryland]: "Maryland",
  [US_STATES.Massachusetts]: "Massachusetts",
  [US_STATES.Michigan]: "Michigan",
  [US_STATES.Minnesota]: "Minnesota",
  [US_STATES.Mississippi]: "Mississippi",
  [US_STATES.Missouri]: "Missouri",
  [US_STATES.Montana]: "Montana",
  [US_STATES.Nebraska]: "Nebraska",
  [US_STATES.Nevada]: "Nevada",
  [US_STATES.NewHampshire]: "New Hampshire",
  [US_STATES.NewJersey]: "New Jersey",
  [US_STATES.NewMexico]: "New Mexico",
  [US_STATES.NewYork]: "New York",
  [US_STATES.NorthCarolina]: "North Carolina",
  [US_STATES.NorthDakota]: "North Dakota",
  [US_STATES.Ohio]: "Ohio",
  [US_STATES.Oklahoma]: "Oklahoma",
  [US_STATES.Oregon]: "Oregon",
  [US_STATES.Pennsylvania]: "Pennsylvania",
  [US_STATES.RhodeIsland]: "Rhode Island",
  [US_STATES.SouthCarolina]: "South Carolina",
  [US_STATES.SouthDakota]: "South Dakota",
  [US_STATES.Tennessee]: "Tennessee",
  [US_STATES.Texas]: "Texas",
  [US_STATES.Utah]: "Utah",
  [US_STATES.Vermont]: "Vermont",
  [US_STATES.Virginia]: "Virginia",
  [US_STATES.Washington]: "Washington",
  [US_STATES.WestVirginia]: "West Virginia",
  [US_STATES.Wisconsin]: "Wisconsin",
  [US_STATES.Wyoming]: "Wyoming",
};
