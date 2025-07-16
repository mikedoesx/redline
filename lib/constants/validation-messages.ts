export enum FormMessages {
  // Generic required
  REQUIRED = "This field is required.",
  NAME_REQUIRED = "Name is required.",
  EMAIL_REQUIRED = "Email is required.",
  PASSWORD_REQUIRED = "Password is required.",
  PASSWORD_CONFIRM_REQUIRED = "Please confirm your password.",

  // Email validation
  INVALID_EMAIL = "Invalid email address.",
  INVALID_CREDENTIALS = "Invalid email or password.",

  // Password validation
  PASSWORD_TOO_SHORT = "Password must be at least 6 characters.",
  PASSWORD_MIN_8 = "Password must be more than 8 characters.",
  PASSWORD_MAX_32 = "Password must be less than 32 characters.",
  PASSWORDS_NO_MATCH = "Passwords do not match.",

  // Name validation
  NAME_TOO_SHORT = "Must be at least 2 characters.",
  NAME_TOO_LONG = "Must be less than 50 characters.",

  // Phone validation
  INVALID_PHONE = "Invalid phone number format.",

  // Number validation
  NEGATIVE_NUMBER = "Value cannot be negative.",
  OVER_MAX = "Value is too large.",
  SERVICE_RADIUS_MIN = "Minimum 1 mile.",
  SERVICE_RADIUS_MAX = "Maximum 500 miles.",
  HOURLY_RATE_MIN = "Minimum $15/hour.",
  HOURLY_RATE_MAX = "Maximum $200/hour.",
  FACILITY_SIZE_MIN = "Minimum 100 sq ft.",
  MANAGED_STAFF_MIN = "Must manage at least 1 staff member.",
}
