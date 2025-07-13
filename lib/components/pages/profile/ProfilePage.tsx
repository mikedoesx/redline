"use client";

import {
  FormStep,
  StepStatus,
  getStepsForUserType,
} from "@/lib/constants/form-steps";
import { useEffect, useMemo, useState } from "react";

import { PageLoading } from "../PageLoading";
import { ProfileForm } from "./ProfileForm";
import { ProfileProgressHeader } from "./ProfileProgressHeader";
import { ProfileView } from "./ProfileView";
import { UserTypeOptions } from "@/lib/constants/form-options";
import { useProfileCheck } from "@/lib/hooks/use-profile-check";

export const ProfilePage = () => {
  const { profile, isCheckingProfile, hasCompleteProfile } = useProfileCheck();
  const [steps, setSteps] = useState<FormStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (steps.length === 0 && profile) {
      const defaultSteps = getStepsForUserType(
        profile.userType || UserTypeOptions.FIRE_WATCH,
      );
      setSteps(defaultSteps);
    }
  }, [steps.length, profile]);

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
      statuses[id] = profile?.stepProgress?.[id]?.status ?? StepStatus.draft;
    });
    return statuses;
  }, [stepInfo.stepIds, profile]);

  if (isCheckingProfile || steps.length === 0) {
    return <PageLoading page="Profile" />;
  }

  if (profile) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto p-4 md:p-6">
          <ProfileView />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <ProfileProgressHeader
        currentStepIndex={currentStepIndex + 1}
        totalSteps={steps.length}
        progress={stepInfo.progress}
        stepStatuses={stepStatuses}
        stepIds={stepInfo.stepIds}
      />

      <ProfileForm
        steps={steps}
        currentStep={stepInfo.currentStep}
        currentStepIndex={currentStepIndex}
        setCurrentStepIndex={setCurrentStepIndex}
      />
    </div>
  );
};
