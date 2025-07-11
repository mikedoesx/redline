export enum FormValidationMessages {
  // Required field messages
  NAME_REQUIRED = "Name is required",
  EMAIL_REQUIRED = "Email is required",
  PASSWORD_REQUIRED = "Password is required",
  PASSWORD_CONFIRM_REQUIRED = "Please confirm your password",

  // Email validation
  INVALID_EMAIL = "Invalid email address",
  INVALID_EMAIL_OR_PASSWORD = "Invalid email or password",

  // Password validation
  PASSWORD_MIN_LENGTH = "Password must be at least 6 characters",
  PASSWORD_MIN_8_CHARS = "Password must be more than 8 characters",
  PASSWORD_MAX_32_CHARS = "Password must be less than 32 characters",
  PASSWORDS_NO_MATCH = "Passwords do not match",

  // Name validation
  NAME_MIN_LENGTH = "Must be at least 2 characters",
  NAME_MAX_LENGTH = "Must be less than 50 characters",

  // Phone validation
  INVALID_PHONE_FORMAT = "Invalid phone number format",

  // Number validation
  EXPERIENCE_NEGATIVE = "Experience cannot be negative",
  EXPERIENCE_MAX = "Please enter a valid number",
  SERVICE_RADIUS_MIN = "Minimum 1 mile",
  SERVICE_RADIUS_MAX = "Maximum 500 miles",
  HOURLY_RATE_MIN = "Minimum $15/hour",
  HOURLY_RATE_MAX = "Maximum $200/hour",
  FACILITY_SIZE_MIN = "Minimum 100 sq ft",
  MANAGED_STAFF_MIN = "Must manage at least 1 staff member",
  YEARS_NEGATIVE = "Cannot be negative",
  YEARS_MAX = "Please enter a valid number",

  // Generic
  FIELD_REQUIRED = "This field is required",
}

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
