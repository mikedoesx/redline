import { FormStep, StepStatus } from "@/lib/constants/form-steps";
import { UserProfile, UserProfileService } from "@/lib/services/user-profile";

export class ProfileFormController {
  private userProfileService: UserProfileService;
  private userId: string;
  private profile: UserProfile;

  constructor(userId: string, profile: UserProfile) {
    this.userId = userId;
    this.profile = profile;
    this.userProfileService = UserProfileService.getInstance();
  }

  getCurrentStepProgress(step: FormStep) {
    return this.profile?.stepProgress[step.id];
  }

  getStepStatus(step: FormStep): StepStatus {
    return this.getCurrentStepProgress(step)?.status || StepStatus.draft;
  }

  canEdit(step: FormStep): boolean {
    return [StepStatus.draft, StepStatus.needsRework].includes(
      this.getStepStatus(step),
    );
  }

  async saveStep(
    step: FormStep,
    data: Record<string, any>,
    status: StepStatus,
  ): Promise<boolean> {
    try {
      await this.userProfileService.saveStepProgress(
        this.userId,
        step.id,
        data,
        status,
      );

      this.profile = {
        ...this.profile,
        ...data,
        stepProgress: {
          ...this.profile.stepProgress,
          [step.id]: {
            stepId: step.id,
            status,
            data,
            submittedAt: status === StepStatus.pending ? new Date() : undefined,
          },
        },
      };

      return true;
    } catch (error) {
      console.error("Error saving step:", error);
      return false;
    }
  }

  canProceedToNextStep(step: FormStep): boolean {
    return this.userProfileService.canProceedToNextStep(this.profile, step);
  }

  getValidationErrors(step: FormStep): string[] {
    return this.userProfileService.getStepValidationErrors(
      this.profile,
      step.id,
    );
  }

  getProfile() {
    return this.profile;
  }
}
