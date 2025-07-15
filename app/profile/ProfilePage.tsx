"use client";

import { ProfileAHJOfficial } from "./ProfileAHJOfficial";
import { ProfileBasicInfo } from "./ProfileBasicInfo";
import { ProfileClient } from "./ProfileClient";
import { ProfileContactPreferences } from "./ProfileContactPreferences";
import { ProfileFireWatch } from "./ProfileFireWatch";
import { ProfileHeader } from "./ProfileHeader";
import { Separator } from "@/lib/components/ui/separator";
import { UserProfile } from "@/lib/types/user-profile";
import { useUserProfile } from "@/lib/hooks/use-user-profile";

export const ProfilePage = () => {
  const { profile, hasCompleteProfile, setProfile } = useUserProfile();

  const handleFieldUpdate = (field: string, value: any) => {
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile as UserProfile);
  };

  if (!profile) return null;

  return (
    <div className="container mx-auto px-6 space-y-8">
      <ProfileHeader
        profile={profile}
        hasCompleteProfile={hasCompleteProfile}
      />

      <Separator />

      <ProfileBasicInfo
        profile={profile}
        handleFieldUpdate={handleFieldUpdate}
      />
      <Separator />

      {/* {profile.userType === UserRole.AHJ_OFFICIAL && ( */}
      <ProfileAHJOfficial
        profile={profile}
        handleFieldUpdate={handleFieldUpdate}
      />
      <Separator />
      {/* )} */}

      {/* {profile.userType === UserRole.FIRE_WATCH && ( */}
      <ProfileFireWatch
        profile={profile}
        handleFieldUpdate={handleFieldUpdate}
      />
      <Separator />
      {/* )} */}

      {/* {profile.userType === UserRole.FIRE_WATCH_CLIENT && ( */}
      <ProfileClient profile={profile} handleFieldUpdate={handleFieldUpdate} />
      <Separator />
      {/* )} */}

      <ProfileContactPreferences
        profile={profile}
        handleFieldUpdate={handleFieldUpdate}
      />
    </div>
  );
};
