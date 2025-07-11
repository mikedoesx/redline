"use client";

import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import {
  type Dispatch,
  type SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  type FormStep,
  getStepsForUserType,
  canEditStep,
  type StepStatus,
  createStepSchema,
} from "@/lib/form-validators/form-steps";
import {
  INITIAL_USER_PROFILE,
  type UserProfile,
  UserProfileService,
} from "@/lib/services/user-profile";

import { Button } from "../../ui/button";
import { DynamicFormField } from "../../forms/DynamicFormField";
import { Form } from "../../ui/form";
import { ProfileNeedToLogin } from "./ProfileNeedToLogin";
import { ProfilePageLoading } from "./ProfilePageLoading";
import { Alert, AlertDescription } from "../../ui/alert";
import type { User } from "firebase/auth";
import { toast } from "sonner";
import { useAuth } from "@/lib/providers/auth-context";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileErrors } from "@/lib/types/error-messages";
import { ProfileSuccess } from "@/lib/types/success-messages";
import { ButtonLabels, LoadingStates } from "@/lib/types/ui-messages";

interface ProfileFormProps {
  steps: FormStep[];
  setSteps: Dispatch<SetStateAction<FormStep[]>>;
  currentStep: FormStep;
  currentStepIndex: number;
  setCurrentStepIndex: Dispatch<SetStateAction<number>>;
}

export const ProfileForm = ({
  steps,
  setSteps,
  currentStep,
  currentStepIndex,
  setCurrentStepIndex,
}: ProfileFormProps) => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [userProfile, setUserProfile] =
    useState<UserProfile>(INITIAL_USER_PROFILE);
  const [stepErrors, setStepErrors] = useState<string[]>([]);
  const userProfileService = UserProfileService.getInstance();

  const isLastStep = useMemo(
    () => currentStepIndex === steps.length - 1,
    [currentStepIndex, steps.length],
  );
  const currentStepProgress = useMemo(
    () => userProfile?.stepProgress[currentStep.id],
    [userProfile, currentStep],
  );
  const currentStepStatus = useMemo(
    () => currentStepProgress?.status || "draft",
    [currentStepProgress],
  );
  const canEdit = useMemo(
    () => canEditStep(currentStepStatus),
    [currentStepStatus],
  );
  const stepSchema = useMemo(
    () => createStepSchema(currentStep),
    [currentStep],
  );
  const canProceedToNextStep = useMemo(
    () => userProfileService.canProceedToNextStep(userProfile, currentStep),
    [userProfile, currentStep?.id],
  );
  const form = useForm({
    resolver: zodResolver(stepSchema),
    mode: "onChange",
  });

  const saveCurrentStep = async (
    data: Record<string, any>,
    status: StepStatus = "draft",
  ) => {
    if (!user) return false;

    try {
      await userProfileService.saveStepProgress(
        user.uid,
        currentStep.id,
        data,
        status,
      );

      // Update local state
      if (userProfile) {
        const updatedProfile = {
          ...userProfile,
          ...data,
          stepProgress: {
            ...userProfile.stepProgress,
            [currentStep.id]: {
              stepId: currentStep.id,
              status,
              data,
              submittedAt: status === "pending" ? new Date() : undefined,
            },
          },
        };
        console.log("🚀 - :125 - updatedProfile:", updatedProfile);
        setUserProfile(updatedProfile);
      }

      return true;
    } catch (error) {
      console.error("Error saving step:", error);
      toast.error(ProfileErrors.SAVE_FAILED);
      return false;
    }
  };

  const goToNextStep = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    const currentData = form.getValues();

    // Determine status based on whether step requires review
    const status: StepStatus = currentStep.requiresReview
      ? "pending"
      : "approved";

    const saved = await saveCurrentStep(currentData, status);
    if (!saved) return;

    if (status === "pending") {
      toast.success(ProfileSuccess.STEP_SUBMITTED);
    } else {
      toast.success(ProfileSuccess.STEP_COMPLETED);
    }

    // Move to next step if available
    if (currentStepIndex < steps.length - 1) {
      // const upcomingStep = steps[currentStepIndex + 1];

      // Check if we can proceed to next step
      if (
        userProfile &&
        !userProfileService.canProceedToNextStep(
          userProfile,
          currentStep,
          // upcomingStep,
        )
      ) {
        toast.warning(ProfileErrors.WAIT_FOR_APPROVAL);
        return;
      }

      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const onSubmit = async (data: any) => {
    console.log("🚀 - :177 - onSubmit - data:", data);
    if (!user || !userProfile) return;
    setIsSubmitting(true);

    try {
      // Save the final step
      const status: StepStatus = currentStep.requiresReview
        ? "pending"
        : "complete";
      const saved = await saveCurrentStep(data, status);

      if (!saved) {
        setIsSubmitting(false);
        return;
      }

      // Check if all steps are complete
      const allStepsComplete = steps.every((step) => {
        const stepProgress = userProfile.stepProgress[step.id];
        return (
          stepProgress && ["approved", "complete"].includes(stepProgress.status)
        );
      });

      if (allStepsComplete) {
        await userProfileService.markProfileComplete(user.uid);
        toast.success(ProfileSuccess.COMPLETE);
        router.push("/dashboard");
      } else {
        toast.success(ProfileSuccess.FINAL_SUBMITTED);
        // Stay on the form to show status
      }
    } catch (error) {
      console.error("Error completing profile:", error);
      toast.error(ProfileErrors.COMPLETE_FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  const populateFormWithExistingData = (existingProfile: UserProfile) => {
    // Populate with step-specific data if available
    const stepData = existingProfile.stepProgress[currentStep.id]?.data;
    if (stepData) {
      Object.keys(stepData).forEach((key) => {
        if (stepData[key] !== undefined) {
          form.setValue(key, stepData[key]);
        }
      });
    } else {
      // Fallback to main profile data
      Object.keys(existingProfile).forEach((key) => {
        if (
          existingProfile[key as keyof typeof existingProfile] !== undefined
        ) {
          form.setValue(
            key,
            existingProfile[key as keyof typeof existingProfile],
          );
        }
      });
    }
  };

  const setEmailFromAuth = (user: User) => {
    if (user.email) {
      form.setValue("email", user.email);
    }
  };

  const determineUserSteps = (existingProfile: UserProfile) => {
    if (existingProfile.userType) {
      const userSteps = getStepsForUserType(existingProfile.userType);
      setSteps(userSteps);

      // Find the next incomplete step
      const stepIds = userSteps.map((s) => s.id);
      const nextIncompleteStep = userProfileService.getNextIncompleteStep(
        existingProfile,
        stepIds,
      );

      if (nextIncompleteStep) {
        const stepIndex = userSteps.findIndex(
          (s) => s.id === nextIncompleteStep,
        );
        if (stepIndex >= 0) {
          setCurrentStepIndex(stepIndex);
        }
      }
    } else {
      setSteps(getStepsForUserType("fire-watch"));
    }
  };

  // Load existing user profile
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user || initialDataLoaded) return;
      setIsLoading(true);

      try {
        const existingProfile = await userProfileService.getUserProfile(
          user.uid,
        );
        if (existingProfile) {
          setUserProfile(existingProfile);
          determineUserSteps(existingProfile);
          populateFormWithExistingData(existingProfile);

          if (!existingProfile.email) {
            setEmailFromAuth(user);
          }
        } else {
          setEmailFromAuth(user);
          setSteps(getStepsForUserType("fire-watch"));
        }
        setInitialDataLoaded(true);
      } catch (error) {
        console.error("Error loading user profile:", error);
        toast.error(ProfileErrors.LOAD_FAILED);
        setSteps(getStepsForUserType(""));
        setEmailFromAuth(user);
        setInitialDataLoaded(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [user, initialDataLoaded, setSteps]);

  // Update form data when step changes
  useEffect(() => {
    if (userProfile && currentStep) {
      populateFormWithExistingData(userProfile);

      // Get validation errors for current step
      const errors = userProfileService.getStepValidationErrors(
        userProfile,
        currentStep.id,
      );
      setStepErrors(errors);
    }
  }, [currentStep, userProfile, form]);

  // Update steps when user type changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "userType" && value.userType) {
        const newSteps = getStepsForUserType(value.userType as string);
        setSteps(newSteps);

        // If we're past the basic info step, reset to step 1 (user type specific step)
        if (currentStepIndex > 0) {
          setCurrentStepIndex(1);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, currentStepIndex, setSteps, setCurrentStepIndex]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>{LoadingStates.LOADING_PROFILE}</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <ProfileNeedToLogin />;
  }

  if (steps.length === 0) {
    return <ProfilePageLoading />;
  }

  return (
    <div className="space-y-6">
      {/* Step Validation Errors */}
      {stepErrors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {stepErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentStep.fields.map((field) => (
              <DynamicFormField
                key={field.name}
                field={field}
                control={form.control}
                disabled={!canEdit}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStepIndex === 0 || isSubmitting}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {ButtonLabels.PREVIOUS}
            </Button>

            <div className="flex space-x-3">
              {!isLastStep ? (
                <Button
                  type="button"
                  onClick={goToNextStep}
                  disabled={isSubmitting || !canProceedToNextStep}
                >
                  {currentStep.requiresReview
                    ? ButtonLabels.SUBMIT_REVIEW
                    : ButtonLabels.SAVE_CONTINUE}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting || !canEdit}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {LoadingStates.COMPLETING}
                    </>
                  ) : (
                    ButtonLabels.COMPLETE_SETUP
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
