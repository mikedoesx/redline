"use client"

import { useAuth } from "@/lib/providers/auth-context"
import { getUserProfile } from "@/lib/services/user-profile"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function useProfileCheck() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [isCheckingProfile, setIsCheckingProfile] = useState(true)
  const [hasCompleteProfile, setHasCompleteProfile] = useState(false)

  useEffect(() => {
    const checkUserProfile = async () => {
      if (authLoading) return

      if (!user) {
        router.push("/login")
        return
      }

      try {
        const userProfile = await getUserProfile(user.uid)

        if (!userProfile || !userProfile.isComplete) {
          setHasCompleteProfile(false)
          router.push("/profile")
        } else {
          setHasCompleteProfile(true)
        }
      } catch (error) {
        console.error("Error checking user profile:", error)
        setHasCompleteProfile(false)
        router.push("/profile")
      } finally {
        setIsCheckingProfile(false)
      }
    }

    checkUserProfile()
  }, [user, authLoading, router])

  return {
    isCheckingProfile: authLoading || isCheckingProfile,
    hasCompleteProfile,
    user,
  }
}
