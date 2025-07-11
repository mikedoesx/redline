"use client";

import {
  INITIAL_USER_PROFILE,
  UserProfile,
  UserProfileService,
} from "@/lib/services/user-profile";
import { useEffect, useState } from "react";

import { useAuth } from "@/lib/providers/auth-context";
import { useRouter } from "next/navigation";

export function useProfileCheck() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const [hasCompleteProfile, setHasCompleteProfile] = useState(false);
  const userProfileService = UserProfileService.getInstance();

  useEffect(() => {
    const checkUserProfile = async () => {
      if (authLoading) return;

      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const userProfile = await userProfileService.getUserProfile(user.uid);
        console.log("🚀 - :32 - checkUserProfile - userProfile:", userProfile);
        setProfile(userProfile ? userProfile : profile);
        if (!userProfile || !userProfile.isComplete) {
          setHasCompleteProfile(false);
          router.push("/profile");
        } else {
          setHasCompleteProfile(true);
        }
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
  };
}
