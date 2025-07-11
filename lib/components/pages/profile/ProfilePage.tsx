"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import {
  type FormStep,
  getStepsForUserType,
  type StepStatus,
} from "@/lib/form-validators/form-steps";
import { useEffect, useState } from "react";

import { ProfileForm } from "./ProfileForm";
import { ProfileNeedToLogin } from "./ProfileNeedToLogin";
import { ProfilePageLoading } from "./ProfilePageLoading";
import { ProfileProgressHeader } from "./ProfileProgressHeader";
import { useAuth } from "@/lib/providers/auth-context";
import {
  UserProfileService,
  type UserProfile,
} from "@/lib/services/user-profile";
import { z } from "zod";

export const ProfilePage = () => {
  const { user, loading } = useAuth();
  const [steps, setSteps] = useState<FormStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const userProfileService = UserProfileService.getInstance();

  // Initialize with default steps
  useEffect(() => {
    if (!steps.length) {
      setSteps(getStepsForUserType("fire-watch"));
    }
  }, [steps.length]);

  // Load user profile to get step statuses
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const profile = await userProfileService.getUserProfile(user.uid);
        setUserProfile(profile);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    loadProfile();
  }, [user]);

  if (loading) {
    return <ProfilePageLoading />;
  }

  if (!user) {
    return <ProfileNeedToLogin />;
  }

  if (steps.length === 0) {
    return <ProfilePageLoading />;
  }

  const currentStep = steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  // Get step statuses for progress header
  const stepStatuses: Record<string, StepStatus> = {};
  const stepIds = steps.map((step) => step.id);

  if (userProfile) {
    stepIds.forEach((stepId) => {
      stepStatuses[stepId] =
        userProfile.stepProgress[stepId]?.status || "draft";
    });
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <ProfileProgressHeader
          currentStepIndex={currentStepIndex}
          totalSteps={steps.length}
          progress={progress}
          stepStatuses={stepStatuses}
          stepIds={stepIds}
        />

        {userProfile?.isComplete ? (
          <div>Works!</div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>{currentStep.title}</CardTitle>
              {currentStep.description && (
                <p className="text-muted-foreground">
                  {currentStep.description}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <ProfileForm
                steps={steps}
                setSteps={setSteps}
                currentStep={currentStep}
                currentStepIndex={currentStepIndex}
                setCurrentStepIndex={setCurrentStepIndex}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
