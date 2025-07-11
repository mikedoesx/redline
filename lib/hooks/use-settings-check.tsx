"use client"

import { useAuth } from "@/lib/providers/auth-context"
import { getUserSettings } from "@/lib/services/user-settings"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function useSettingsCheck() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [isCheckingSettings, setIsCheckingSettings] = useState(true)
  const [hasCompleteSettings, setHasCompleteSettings] = useState(false)

  useEffect(() => {
    const checkUserSettings = async () => {
      if (authLoading) return

      if (!user) {
        router.push("/login")
        return
      }

      try {
        const userSettings = await getUserSettings(user.uid)

        if (!userSettings || !userSettings.settingsComplete) {
          setHasCompleteSettings(false)
          router.push("/settings")
        } else {
          setHasCompleteSettings(true)
        }
      } catch (error) {
        console.error("Error checking user settings:", error)
        setHasCompleteSettings(false)
        router.push("/settings")
      } finally {
        setIsCheckingSettings(false)
      }
    }

    checkUserSettings()
  }, [user, authLoading, router])

  return {
    isCheckingSettings: authLoading || isCheckingSettings,
    hasCompleteSettings,
    user,
  }
}
