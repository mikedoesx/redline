"use client";

import type { FormStep, StepStatus } from "@/lib/form-validators/form-steps";
import { useMemo, useState } from "react";

import { ProfileForm } from "./ProfileForm";
import { ProfilePageLoading } from "./ProfilePageLoading";
import { ProfileProgressHeader } from "./ProfileProgressHeader";
import { ProfileView } from "./ProfileView";
import { getStepsForUserType } from "@/lib/form-validators/form-steps";
import { useProfileCheck } from "@/lib/hooks/use-profile-check";

export const ProfilePage = () => {
  const { profile, isCheckingProfile, hasCompleteProfile } = useProfileCheck();
  const [steps, setSteps] = useState<FormStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const stepInfo = useMemo(() => {
    return {
      currentStep: steps[currentStepIndex],
      progress: ((currentStepIndex + 1) / steps.length) * 100,
      stepIds: steps.map((it) => it.id),
    };
  }, [steps, currentStepIndex]);
  const stepStatuses = useMemo(() => {
    const statuses: Record<string, StepStatus> = {};
    stepInfo.stepIds.forEach((id) => {
      statuses[id] = profile.stepProgress[id]?.status ?? "draft";
    });

    return statuses;
  }, [stepInfo, profile]);

  if (isCheckingProfile) {
    return <ProfilePageLoading />;
  }

  // If profile is complete, show the profile view
  if (hasCompleteProfile && profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <ProfileView />
        </div>
      </div>
    );
  }

  // If profile is not complete, show the form
  if (!stepInfo.currentStep) {
    // Initialize with default steps if no current step
    const defaultSteps = getStepsForUserType("fire-watch");
    setSteps(defaultSteps);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <ProfileProgressHeader
          currentStepIndex={currentStepIndex + 1}
          totalSteps={steps.length}
          progress={stepInfo.progress}
          stepStatuses={stepStatuses}
          stepIds={stepInfo.stepIds}
        />

        <div className="mt-8">
          <ProfileForm
            steps={steps}
            setSteps={setSteps}
            currentStep={stepInfo.currentStep}
            currentStepIndex={currentStepIndex}
            setCurrentStepIndex={setCurrentStepIndex}
          />
        </div>
      </div>
    </div>
  );
};
