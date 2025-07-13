"use client";

import {
  INITIAL_USER_PROFILE,
  UserProfile,
  UserProfileService,
} from "@/lib/services/user-profile";
import { useEffect, useMemo, useState } from "react";

import { UserTypeOptions } from "../constants/form-options";
import { useAuth } from "@/lib/providers/auth-context";
import { useRouter } from "next/navigation";

export function useProfileCheck() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(
    INITIAL_USER_PROFILE,
  );
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const [hasCompleteProfile, setHasCompleteProfile] = useState(false);
  const userProfileService = UserProfileService.getInstance();

  const getDisplayUserType = useMemo(() => {
    switch (profile?.userType) {
      case UserTypeOptions.AHJ_OFFICIAL:
        return "AHJ";
      case UserTypeOptions.FIRE_WATCH:
        return "Fire Watch";
      case UserTypeOptions.FIRE_WATCH_ADMIN:
        return "Admin";
      case UserTypeOptions.FIRE_WATCH_CLIENT:
        return "Client";
    }
  }, [profile]);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (authLoading) return;

      if (!user) {
        router.push("/login");
        return;
      }

      try {
        let userProfile = await userProfileService.getUserProfile(user.uid);

        if (!userProfile) {
          // Profile doesn't exist, create a new one
          await userProfileService.saveUserProfile(user.uid, {
            ...INITIAL_USER_PROFILE,
            userId: user.uid,
            email: user.email ?? "",
          });

          userProfile = await userProfileService.getUserProfile(user.uid);
        }

        setProfile(userProfile);
        setHasCompleteProfile(Boolean(userProfile?.isComplete));
      } catch (error) {
        console.error("Error checking user profile:", error);
        setHasCompleteProfile(false);
        router.push("/profile");
      } finally {
        setIsCheckingProfile(false);
      }
    };

    checkUserProfile();
  }, [user, authLoading, router]);

  return {
    isCheckingProfile: authLoading || isCheckingProfile,
    hasCompleteProfile,
    profile,
    setProfile,
    getDisplayUserType,
  };
}
