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
  createStepSchema,
  StepStatus,
} from "@/lib/constants/form-steps";
import { Button } from "../../ui/button";
import { DynamicFormField } from "../../forms/DynamicFormField";
import { Form } from "../../ui/form";
import { ProfileNeedToLogin } from "./ProfileNeedToLogin";
import { PageLoading } from "../PageLoading";
import { Alert, AlertDescription } from "../../ui/alert";
import { toast } from "sonner";
import { useAuth } from "@/lib/providers/auth-context";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileErrors } from "@/lib/types/error-messages";
import { ProfileSuccess } from "@/lib/types/success-messages";
import { ButtonLabels, LoadingStates } from "@/lib/types/ui-messages";
import { ProfileFormController } from "@/lib/controllers/ProfileFormController";
import { UserProfileService } from "@/lib/services/user-profile";
import { Card, CardContent, CardHeader } from "../../ui/card";

interface ProfileFormProps {
  steps: FormStep[];
  currentStep: FormStep;
  currentStepIndex: number;
  setCurrentStepIndex: Dispatch<SetStateAction<number>>;
}

export const ProfileForm = ({
  steps,
  currentStep,
  currentStepIndex,
  setCurrentStepIndex,
}: ProfileFormProps) => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [controller, setController] = useState<ProfileFormController | null>(
    null,
  );
  const [stepErrors, setStepErrors] = useState<string[]>([]);
  const service = UserProfileService.getInstance();

  const isLastStep = useMemo(
    () => currentStepIndex === steps.length - 1,
    [currentStepIndex, steps.length],
  );

  const stepSchema = useMemo(
    () => createStepSchema(currentStep),
    [currentStep],
  );

  const form = useForm({
    resolver: zodResolver(stepSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const init = async () => {
      if (!user || controller) return;
      setIsLoading(true);

      try {
        const profile = await service.getUserProfile(user.uid);
        if (!profile) throw new Error("Profile not found");

        const ctrl = new ProfileFormController(user.uid, profile);
        setController(ctrl);

        const stepData = profile.stepProgress[currentStep.id]?.data || {};

        Object.entries(stepData).forEach(([key, value]) => {
          if (value !== undefined) form.setValue(key, value);
        });

        if (!stepData.email && profile.email) {
          form.setValue("email", profile.email);
        }

        setStepErrors(ctrl.getValidationErrors(currentStep));
      } catch (error) {
        console.error(error);
        toast.error(ProfileErrors.LOAD_FAILED);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [user, controller, currentStep, form]);

  const goToNextStep = async () => {
    if (!controller) return;

    const isValid = await form.trigger();
    if (!isValid) return;

    const data = form.getValues();
    const status = currentStep.requiresReview
      ? StepStatus.pending
      : StepStatus.approved;

    const saved = await controller.saveStep(currentStep, data, status);
    if (!saved) return toast.error(ProfileErrors.SAVE_FAILED);

    setStepErrors(controller.getValidationErrors(currentStep));

    toast.success(
      status === StepStatus.pending
        ? ProfileSuccess.STEP_SUBMITTED
        : ProfileSuccess.STEP_COMPLETED,
    );

    if (
      currentStepIndex < steps.length - 1 &&
      controller.canProceedToNextStep(currentStep)
    ) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else if (!controller.canProceedToNextStep(currentStep)) {
      toast.warning(ProfileErrors.WAIT_FOR_APPROVAL);
    }
  };

  const onSubmit = async (data: any) => {
    if (!controller || !user) return;
    setIsSubmitting(true);

    try {
      const status = currentStep.requiresReview
        ? StepStatus.pending
        : StepStatus.complete;

      const saved = await controller.saveStep(currentStep, data, status);
      if (!saved) return;

      const allStepsComplete = steps.every((step) => {
        const stepStatus = controller.getStepStatus(step);
        return [StepStatus.approved, StepStatus.complete].includes(stepStatus);
      });

      if (allStepsComplete) {
        await controller["userProfileService"].markProfileComplete(user.uid);
        toast.success(ProfileSuccess.COMPLETE);
        router.push("/dashboard");
      } else {
        toast.success(ProfileSuccess.FINAL_SUBMITTED);
      }
    } catch (error) {
      console.error("Error completing profile:", error);
      toast.error(ProfileErrors.COMPLETE_FAILED);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoading || !controller) {
    return <PageLoading page="Profile" />;
  }

  if (!user) {
    return <ProfileNeedToLogin />;
  }

  return (
    <Card>
      <CardHeader>
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
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentStep.fields.map((field) => (
                  <DynamicFormField
                    key={field.name}
                    field={field}
                    control={form.control}
                    disabled={!controller.canEdit(currentStep)}
                  />
                ))}
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
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
                      disabled={isSubmitting}
                    >
                      {currentStep.requiresReview
                        ? ButtonLabels.SUBMIT_REVIEW
                        : ButtonLabels.SAVE_CONTINUE}
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={
                        isSubmitting || !controller.canEdit(currentStep)
                      }
                    >
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
      </CardContent>
    </Card>
  );
};
