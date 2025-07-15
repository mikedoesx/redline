"use client";

import { Alert, AlertDescription, AlertTitle } from "@/lib/components/ui/alert";
import { UserProfile, UserRole } from "@/lib/types/user-profile";

import { Badge } from "@/lib/components/ui/badge";
import { useMemo } from "react";

interface ProfileHeaderProps {
  profile: UserProfile;
  hasCompleteProfile: boolean;
}

export const ProfileHeader = ({
  profile,
  hasCompleteProfile,
}: ProfileHeaderProps) => {
  const getUserTypeLabel = useMemo(() => {
    switch (profile.userType) {
      case UserRole.FIRE_WATCH:
        return "Fire Watch Personnel";
      case UserRole.FIRE_WATCH_CLIENT:
        return "Client";
      case UserRole.FIRE_WATCH_ADMIN:
        return "Administrator";
      case UserRole.AHJ_OFFICIAL:
        return "Authority Having Jurisdiction";
      default:
        return profile.userType;
    }
  }, [profile.userType]);

  return (
    <>
      {!hasCompleteProfile && (
        <Alert variant="destructive">
          <AlertTitle>Profile Incomplete</AlertTitle>
          <AlertDescription>
            To access scheduling and assignments, please complete all required
            fields.
          </AlertDescription>
        </Alert>
      )}

      <header className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <Badge variant="default">{getUserTypeLabel}</Badge>
        </div>
        <p className="text-muted-foreground">
          Manage your profile information below to get started.
        </p>
      </header>
    </>
  );
};
