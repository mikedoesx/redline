import {
  FormStep,
  StepProgress,
  StepStatus,
} from "@/lib/form-validators/form-steps";
import {
  ProfileErrors,
  getAdminFeedbackError,
} from "@/lib/types/error-messages";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { UserTypeOptions } from "../constants/form-options";
import { db } from "./firebase";
import { replaceUndefinedWithNull } from "../utils";

export enum UserProfileStatus {
  incomplete = "incomplete",
  pendingReview = "pending-review",
  complete = "complete",
}

export const INITIAL_USER_PROFILE: UserProfile = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  userType: UserTypeOptions.FIRE_WATCH,
  stepProgress: {},
  overallStatus: UserProfileStatus.incomplete,
};

export interface UserProfile {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: UserTypeOptions;

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
  overallStatus: UserProfileStatus;

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
          overallStatus: UserProfileStatus.incomplete,
          createdAt: serverTimestamp(),
        });
      }

      return { success: true };
    } catch (error) {
      console.error("Error saving user profile:", error);
      throw new Error(ProfileErrors.SAVE_FAILED);
    }
  }

  async saveStepProgress(
    userId: string,
    stepId: string,
    data: Record<string, any>,
    status: StepStatus = StepStatus.draft,
  ): Promise<{ success: boolean }> {
    try {
      const userProfileRef = doc(db, "user-profiles", userId);
      const docSnap = await getDoc(userProfileRef);

      const stepProgress: StepProgress = {
        stepId,
        status,
        data,
        submittedAt: status === StepStatus.pending ? new Date() : null,
      };

      if (docSnap.exists()) {
        const currentProfile = docSnap.data() as UserProfile;
        const updatedStepProgress = {
          ...currentProfile.stepProgress,
          [stepId]: stepProgress,
        };

        const updateDTO = replaceUndefinedWithNull({
          ...data,
          stepProgress: updatedStepProgress,
          updatedAt: serverTimestamp(),
        });
        console.log(
          "🚀 - :150 - UserProfileService - saveStepProgress - updateDTO:",
          updateDTO,
        );

        // Also save the data to the main profile for easy access
        await updateDoc(userProfileRef, updateDTO);
      } else {
        // Create new profile with step progress
        const createDTO = replaceUndefinedWithNull({
          userId,
          ...data,
          stepProgress: { [stepId]: stepProgress },
          overallStatus: UserProfileStatus.incomplete,
          isComplete: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        console.log(
          "🚀 - :165 - UserProfileService - saveStepProgress - createDTO:",
          createDTO,
        );
        await setDoc(userProfileRef, createDTO);
      }

      return { success: true };
    } catch (error) {
      console.error("Error saving step progress:", error);
      throw new Error(ProfileErrors.SAVE_STEP_FAILED);
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
              status: StepStatus.pending as StepStatus,
              submittedAt: new Date(),
            },
          };
          const updateDTO = replaceUndefinedWithNull({
            stepProgress: updatedStepProgress,
            updatedAt: serverTimestamp(),
          });
          console.log(
            "🚀 - :201 - UserProfileService - submitStepForReview -updateDTO:",
            updateDTO,
          );

          await updateDoc(userProfileRef, updateDTO);
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error submitting step for review:", error);
      throw new Error(ProfileErrors.SUBMIT_REVIEW_FAILED);
    }
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userProfileRef = doc(db, "user-profiles", userId);
      const docSnap = await getDoc(userProfileRef);

      if (docSnap.exists()) {
        const response = replaceUndefinedWithNull(
          docSnap.data() as UserProfile,
        );
        console.log(
          "🚀 - :221 - UserProfileService - getUserProfile - response:",
          response,
        );
        return response;
      }

      return null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw new Error(ProfileErrors.GET_FAILED);
    }
  }

  async markProfileComplete(userId: string) {
    try {
      const userProfileRef = doc(db, "user-profiles", userId);
      const updateDTO = replaceUndefinedWithNull({
        isComplete: true,
        overallStatus: StepStatus.complete,
        updatedAt: serverTimestamp(),
      });
      console.log(
        "🚀 - :240 - UserProfileService - markProfileComplete - updateDTO:",
        updateDTO,
      );
      await updateDoc(userProfileRef, updateDTO);

      return { success: true };
    } catch (error) {
      console.error("Error marking profile complete:", error);
      throw new Error(ProfileErrors.MARK_COMPLETE_FAILED);
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
      if (![StepStatus.approved, StepStatus.complete].includes(status)) {
        return stepId; // Step is not complete
      }
    }

    return null; // All steps are complete
  }

  canProceedToNextStep(
    profile: UserProfile,
    currentStep: FormStep,
    // nextStep: FormStep,
  ): boolean {
    if (!currentStep?.id) {
      return false;
    }

    const currentStepProgress = profile.stepProgress[currentStep.id];
    if (!currentStepProgress) {
      return false; // Current step hasn't been started
    }

    return [
      StepStatus.approved,
      StepStatus.complete,
      StepStatus.pending,
    ].includes(currentStepProgress.status);
  }

  getStepValidationErrors(profile: UserProfile, stepId: string): string[] {
    const stepProgress = profile.stepProgress[stepId];
    const errors: string[] = [];

    if (!stepProgress) {
      errors.push(ProfileErrors.STEP_NOT_STARTED);
      return errors;
    }

    if (
      stepProgress.status === StepStatus.needsRework &&
      stepProgress.reviewNotes
    ) {
      errors.push(getAdminFeedbackError(stepProgress.reviewNotes));
    }

    return errors;
  }
}
