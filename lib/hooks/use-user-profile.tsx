"use client";

import {
  AppUser,
  AppUserRole,
  AppUserStatus,
  INITIAL_USER_PROFILE,
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

export function useAppUser() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<AppUser | null>(INITIAL_USER_PROFILE);
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const [hasCompleteProfile, setHasCompleteProfile] = useState(false);

  const isComplete = useMemo(
    () => profile?.status === AppUserStatus.complete,
    [profile?.status],
  );
  const isIncomplete = useMemo(
    () => profile?.status === AppUserStatus.incomplete,
    [profile?.status],
  );
  const isPendingReview = useMemo(
    () => profile?.status === AppUserStatus.pendingReview,
    [profile?.status],
  );

  const getDisplayUserType = useMemo(() => {
    switch (profile?.userType) {
      case AppUserRole.AHJ_OFFICIAL:
        return "AHJ";
      case AppUserRole.FIRE_WATCH:
        return "Fire Watch";
      case AppUserRole.FIRE_WATCH_ADMIN:
        return "Admin";
      case AppUserRole.FIRE_WATCH_CLIENT:
        return "Client";
    }
  }, [profile]);

  const saveAppUser = async (
    uid: string,
    profile: Partial<AppUser>,
  ): Promise<{ success: boolean }> => {
    try {
      // const userProfileRef = doc(db, "user-profiles", uid);
      // const profileData = {
      //   ...profile,
      //   uid,
      //   updatedAt: serverTimestamp(),
      // };

      // // Check if document exists
      // const docSnap = await getDoc(userProfileRef);

      // if (docSnap.exists()) {
      //   await updateDoc(userProfileRef, profileData);
      // } else {
      //   await setDoc(userProfileRef, {
      //     ...profileData,
      //     ...INITIAL_USER_PROFILE,
      //     createdAt: serverTimestamp(),
      //   });
      // }

      return { success: true };
    } catch (error) {
      console.error("Error saving user profile:", error);
      throw new Error(ProfileErrors.SAVE_FAILED);
    }
  };

  const getAppUser = async (uid: string): Promise<AppUser | null> => {
    try {
      // const userProfileRef = doc(db, "user-profiles", uid);
      // const docSnap = await getDoc(userProfileRef);

      // if (docSnap.exists()) {
      //   const response = replaceUndefinedWithNull(docSnap.data() as AppUser);
      //   console.log(
      //     "🚀 - :221 - AppUserService - getAppUser - response:",
      //     response,
      //   );
      //   return response;
      // }

      return null;
    } catch (error) {
      console.error("Error getting user profile:", error);
      throw new Error(ProfileErrors.GET_FAILED);
    }
  };

  useEffect(() => {
    const checkAppUser = async () => {
      if (authLoading) return;

      if (!user) {
        router.push("/login");
        return;
      }

      try {
        let userProfile = await getAppUser(user.uid);

        if (!userProfile) {
          // Profile doesn't exist, create a new one
          await saveAppUser(user.uid, {
            ...INITIAL_USER_PROFILE,
            uid: user.uid,
            email: user.email ?? "",
          });

          userProfile = await getAppUser(user.uid);
        }

        setProfile(userProfile);
        setHasCompleteProfile(
          Boolean(userProfile?.status === AppUserStatus.complete),
        );
      } catch (error) {
        console.error("Error checking user profile:", error);
        setHasCompleteProfile(false);
        router.push("/profile");
      } finally {
        setIsCheckingProfile(false);
      }
    };

    checkAppUser();
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
    saveAppUser,
    getAppUser,
  };
}
