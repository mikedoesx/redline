import {
  ProfileErrorMessages,
  getAdminFeedbackError,
} from "@/lib/types/error-messages";
import type {
  StepProgress,
  StepStatus,
} from "@/lib/form-validators/form-steps";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

export interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: string;

  // Fire Watch specific
  yearsExperience?: number;
  certifications?: string[];
  availability?: string[];
  serviceRadius?: number;
  hourlyRate?: number;

  // Client specific
  companyName?: string;
  industryType?: string;
  facilitySize?: number;
  typicalShiftLength?: string;
  frequencyNeeded?: string;

  // Admin specific
  organizationName?: string;
  adminLevel?: string;
  managedStaff?: number;
  serviceAreas?: string[];
  yearsInManagement?: number;

  // AHJ specific
  jurisdiction?: string;
  position?: string;
  badgeNumber?: string;
  jurisdictionType?: string;
  authorityLevel?: string[];
  yearsInPosition?: number;

  // Contact preferences
  preferredContactMethod?: string;
  timezone?: string;
  notifications?: string[];
  emergencyContact?: string;
  emergencyContactPhone?: string;

  // Step progress tracking
  stepProgress: Record<string, StepProgress>;
  currentStep?: string;
  overallStatus: "incomplete" | "pending-review" | "complete";

  // Metadata
  createdAt?: any;
  updatedAt?: any;
  isComplete?: boolean;
}

export class UserProfileService {
  private static instance: UserProfileService;

  private constructor() {}

  static getInstance(): UserProfileService {
    if (!UserProfileService.instance) {
      UserProfileService.instance = new UserProfileService();
    }

    return UserProfileService.instance;
  }

  async saveUserProfile(
    userId: string,
    profile: Partial<UserProfile>,
  ): Promise<{ success: boolean }> {
    try {
      const userProfileRef = doc(db, "user-profiles", userId);
      const profileData = {
        ...profile,
        userId,
        updatedAt: serverTimestamp(),
      };

      // Check if document exists
      const docSnap = await getDoc(userProfileRef);

      if (docSnap.exists()) {
        await updateDoc(userProfileRef, profileData);
      } else {
        await setDoc(userProfileRef, {
          ...profileData,
          isComplete: false,
          stepProgress: {},
          overallStatus: "incomplete",
          createdAt: serverTimestamp(),
        });
      }

      return { success: true };
    } catch (error) {
      console.error("Error saving user profile:", error);
      throw new Error(ProfileErrorMessages.SAVE_FAILED);
    }
  }

  async saveStepProgress(
    userId: string,
    stepId: string,
    data: Record<string, any>,
    status: StepStatus = "draft",
  ): Promise<{ success: boolean }> {
    try {
      const userProfileRef = doc(db, "user-profiles", userId);
      const docSnap = await getDoc(userProfileRef);

      const stepProgress: StepProgress = {
        stepId,
        status,
        data,
        submittedAt: status === "pending" ? new Date() : undefined,
      };

      if (docSnap.exists()) {
        const currentProfile = docSnap.data() as UserProfile;
        const updatedStepProgress = {
          ...currentProfile.stepProgress,
          [stepId]: stepProgress,
        };

        // Also save the data to the main profile for easy access
        await updateDoc(userProfileRef, {
          ...data,
          stepProgress: updatedStepProgress,
          updatedAt: serverTimestamp(),
        });
      } else {
        // Create new profile with step progress
        await setDoc(userProfileRef, {
          userId,
          ...data,
          stepProgress: { [stepId]: stepProgress },
          overallStatus: "incomplete",
          isComplete: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }

      return { success: true };
    } catch (error) {
      console.error("Error saving step progress:", error);
      throw new Error(ProfileErrorMessages.SAVE_STEP_FAILED);
    }
  }

  async submitStepForReview(
    userId: string,
    stepId: string,
  ): Promise<{ success: boolean }> {
    try {
      const userProfileRef = doc(db, "user-profiles", userId);
      const docSnap = await getDoc(userProfileRef);

      if (docSnap.exists()) {
        const currentProfile = docSnap.data() as UserProfile;
        const stepProgress = currentProfile.stepProgress[stepId];

        if (stepProgress) {
          const updatedStepProgress = {
            ...currentProfile.stepProgress,
            [stepId]: {
              ...stepProgress,
              status: "pending" as StepStatus,
              submittedAt: new Date(),
            },
          };

          await updateDoc(userProfileRef, {
            stepProgress: updatedStepProgress,
            updatedAt: serverTimestamp(),
          });
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error submitting step for review:", error);
      throw new Error(ProfileErrorMessages.SUBMIT_REVIEW_FAILED);
    }
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userProfileRef = doc(db, "user-profiles", userId);
      const docSnap = await getDoc(userProfileRef);

      if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
      }

      return null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw new Error(ProfileErrorMessages.GET_PROFILE_FAILED);
    }
  }

  async markProfileComplete(userId: string) {
    try {
      const userProfileRef = doc(db, "user-profiles", userId);
      await updateDoc(userProfileRef, {
        isComplete: true,
        overallStatus: "complete",
        updatedAt: serverTimestamp(),
      });

      return { success: true };
    } catch (error) {
      console.error("Error marking profile complete:", error);
      throw new Error(ProfileErrorMessages.MARK_COMPLETE_FAILED);
    }
  }

  getNextIncompleteStep(
    profile: UserProfile,
    availableSteps: string[],
  ): string | null {
    // Find the first step that is not complete
    for (const stepId of availableSteps) {
      const stepProgress = profile.stepProgress[stepId];

      if (!stepProgress) {
        return stepId; // Step hasn't been started
      }

      const status = stepProgress.status;
      if (!["approved", "complete"].includes(status)) {
        return stepId; // Step is not complete
      }
    }

    return null; // All steps are complete
  }

  canProceedToNextStep(
    profile: UserProfile,
    currentStepId: string,
    nextStepId: string,
  ): boolean {
    const currentStepProgress = profile.stepProgress[currentStepId];

    if (!currentStepProgress) {
      return false; // Current step hasn't been started
    }

    // Can proceed if current step is approved or complete
    return ["approved", "complete"].includes(currentStepProgress.status);
  }

  getStepValidationErrors(profile: UserProfile, stepId: string): string[] {
    const stepProgress = profile.stepProgress[stepId];
    const errors: string[] = [];

    if (!stepProgress) {
      errors.push(ProfileErrorMessages.STEP_NOT_STARTED);
      return errors;
    }

    if (stepProgress.status === "needs-rework" && stepProgress.reviewNotes) {
      errors.push(getAdminFeedbackError(stepProgress.reviewNotes));
    }

    return errors;
  }
}
