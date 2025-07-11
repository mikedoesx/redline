export enum AuthErrorMessages {
  INVALID_CREDENTIALS = "Invalid login credentials",
  EMAIL_ALREADY_IN_USE = "This email is already in use",
  WEAK_PASSWORD = "Please choose a longer password",
  USER_NOT_FOUND = "No account found with this email address",
  WRONG_PASSWORD = "Incorrect password",
  INVALID_EMAIL = "Invalid email address",
  TOO_MANY_REQUESTS = "Too many failed attempts. Please try again later",
  GENERIC_LOGIN_ERROR = "Couldn't login",
  GENERIC_SIGNIN_ERROR = "Failed to sign in. Please try again",
  PASSWORD_MISMATCH = "Passwords do not match",
}

export enum ProfileErrorMessages {
  LOAD_FAILED = "Failed to load existing profile",
  SAVE_FAILED = "Failed to save progress",
  SAVE_STEP_FAILED = "Failed to save step progress",
  SUBMIT_REVIEW_FAILED = "Failed to submit step for review",
  GET_PROFILE_FAILED = "Failed to get user profile",
  MARK_COMPLETE_FAILED = "Failed to mark profile complete",
  COMPLETE_PROFILE_FAILED = "Failed to complete profile. Please try again",
  STEP_NOT_STARTED = "Step has not been started",
  WAIT_FOR_APPROVAL = "Please wait for current step to be approved before proceeding",
}

export enum ValidationErrorMessages {
  REQUIRED_FIELD = "This field is required",
  INVALID_EMAIL = "Invalid email address",
  INVALID_PHONE = "Invalid phone number format",
  NAME_TOO_SHORT = "Must be at least 2 characters",
  NAME_TOO_LONG = "Must be less than 50 characters",
  PASSWORD_TOO_SHORT = "Password must be at least 6 characters",
  EXPERIENCE_NEGATIVE = "Experience cannot be negative",
  EXPERIENCE_TOO_HIGH = "Please enter a valid number",
  SERVICE_RADIUS_MIN = "Minimum 1 mile",
  SERVICE_RADIUS_MAX = "Maximum 500 miles",
  HOURLY_RATE_MIN = "Minimum $15/hour",
  HOURLY_RATE_MAX = "Maximum $200/hour",
  FACILITY_SIZE_MIN = "Minimum 100 sq ft",
  MANAGED_STAFF_MIN = "Must manage at least 1 staff member",
  YEARS_NEGATIVE = "Cannot be negative",
  YEARS_TOO_HIGH = "Please enter a valid number",
}

export enum GeneralErrorMessages {
  GENERIC_ERROR = "An unexpected error occurred",
  NETWORK_ERROR = "Network error. Please check your connection",
  PERMISSION_DENIED = "Permission denied",
  NOT_FOUND = "Resource not found",
  TIMEOUT = "Request timed out. Please try again",
}

// Helper function to get admin feedback error message
export const getAdminFeedbackError = (reviewNotes: string): string => {
  return `Admin feedback: ${reviewNotes}`
}
