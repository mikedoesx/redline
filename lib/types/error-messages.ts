export enum AuthErrors {
  INVALID_CREDENTIALS = "Invalid login credentials.",
  EMAIL_IN_USE = "This email is already in use.",
  WEAK_PASSWORD = "Please choose a longer password.",
  USER_NOT_FOUND = "No account found with this email address.",
  WRONG_PASSWORD = "Incorrect password.",
  INVALID_EMAIL = "Invalid email address.",
  TOO_MANY_ATTEMPTS = "Too many failed attempts. Please try again later.",
  LOGIN_FAILED = "Couldn't login.",
  SIGNIN_FAILED = "Failed to sign in. Please try again.",
  PASSWORDS_NO_MATCH = "Passwords do not match.",
}

export enum ProfileErrors {
  LOAD_FAILED = "Failed to load profile.",
  SAVE_FAILED = "Failed to save.",
  SAVE_STEP_FAILED = "Failed to save step progress.",
  SUBMIT_REVIEW_FAILED = "Failed to submit for review.",
  GET_FAILED = "Failed to get profile.",
  MARK_COMPLETE_FAILED = "Failed to mark complete.",
  COMPLETE_FAILED = "Failed to complete profile. Please try again.",
  STEP_NOT_STARTED = "Step has not been started.",
  WAIT_FOR_APPROVAL = "Please wait for approval before proceeding.",
}

export enum GeneralErrors {
  GENERIC = "An unexpected error occurred.",
  NETWORK = "Network error. Please check your connection.",
  PERMISSION = "Permission denied.",
  NOT_FOUND = "Resource not found.",
  TIMEOUT = "Request timed out. Please try again.",
}

export const getAdminFeedbackError = (reviewNotes: string): string => {
  return `Admin feedback: ${reviewNotes}`;
};
