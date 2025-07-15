"use client";

import {
  INITIAL_USER_PROFILE,
  UserProfile,
  UserProfileStatus,
  UserRole,
} from "@/lib/types/user-profile";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

import { ProfileErrors } from "../types/error-messages";
import { db } from "../services/firebase";
import { replaceUndefinedWithNull } from "../utils";
import { useAuth } from "@/lib/providers/auth-context";
import { useRouter } from "next/navigation";

export function useUserProfile() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(
    INITIAL_USER_PROFILE,
  );
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const [hasCompleteProfile, setHasCompleteProfile] = useState(false);

  const isComplete = useMemo(
    () => profile?.status === UserProfileStatus.complete,
    [profile?.status],
  );
  const isIncomplete = useMemo(
    () => profile?.status === UserProfileStatus.incomplete,
    [profile?.status],
  );
  const isPendingReview = useMemo(
    () => profile?.status === UserProfileStatus.pendingReview,
    [profile?.status],
  );

  const getDisplayUserType = useMemo(() => {
    switch (profile?.userType) {
      case UserRole.AHJ_OFFICIAL:
        return "AHJ";
      case UserRole.FIRE_WATCH:
        return "Fire Watch";
      case UserRole.FIRE_WATCH_ADMIN:
        return "Admin";
      case UserRole.FIRE_WATCH_CLIENT:
        return "Client";
    }
  }, [profile]);

  const saveUserProfile = async (
    userId: string,
    profile: Partial<UserProfile>,
  ): Promise<{ success: boolean }> => {
    try {
      const userProfileRef = doc(db, "user-profiles", userId);
      const profileData = {
        ...profile,
        userId,
        updatedAt: serverTimestamp(),
      };

      // Check if document exists
      const docSnap = await getDoc(userProfileRef);

      if (docSnap.exists()) {
        await updateDoc(userProfileRef, profileData);
      } else {
        await setDoc(userProfileRef, {
          ...profileData,
          ...INITIAL_USER_PROFILE,
          createdAt: serverTimestamp(),
        });
      }

      return { success: true };
    } catch (error) {
      console.error("Error saving user profile:", error);
      throw new Error(ProfileErrors.SAVE_FAILED);
    }
  };

  const getUserProfile = async (
    userId: string,
  ): Promise<UserProfile | null> => {
    try {
      const userProfileRef = doc(db, "user-profiles", userId);
      const docSnap = await getDoc(userProfileRef);

      if (docSnap.exists()) {
        const response = replaceUndefinedWithNull(
          docSnap.data() as UserProfile,
        );
        console.log(
          "🚀 - :221 - UserProfileService - getUserProfile - response:",
          response,
        );
        return response;
      }

      return null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw new Error(ProfileErrors.GET_FAILED);
    }
  };

  useEffect(() => {
    const checkUserProfile = async () => {
      if (authLoading) return;

      if (!user) {
        router.push("/login");
        return;
      }

      try {
        let userProfile = await getUserProfile(user.uid);

        if (!userProfile) {
          // Profile doesn't exist, create a new one
          await saveUserProfile(user.uid, {
            ...INITIAL_USER_PROFILE,
            userId: user.uid,
            email: user.email ?? "",
          });

          userProfile = await getUserProfile(user.uid);
        }

        setProfile(userProfile);
        setHasCompleteProfile(
          Boolean(userProfile?.status === UserProfileStatus.complete),
        );
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
    isComplete,
    isIncomplete,
    isPendingReview,
    saveUserProfile,
    getUserProfile,
  };
}
