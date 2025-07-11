import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"

import { db } from "./firebase"

export interface UserSettings {
  userId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  userType: string

  // Fire Watch specific
  yearsExperience?: number
  certifications?: string[]
  availability?: string[]
  serviceRadius?: number
  hourlyRate?: number

  // Client specific
  companyName?: string
  industryType?: string
  facilitySize?: number
  typicalShiftLength?: string
  frequencyNeeded?: string

  // Admin specific
  organizationName?: string
  adminLevel?: string
  managedStaff?: number
  serviceAreas?: string[]
  yearsInManagement?: number

  // AHJ specific
  jurisdiction?: string
  position?: string
  badgeNumber?: string
  jurisdictionType?: string
  authorityLevel?: string[]
  yearsInPosition?: number

  // Contact preferences
  preferredContactMethod?: string
  timezone?: string
  notifications?: string[]
  emergencyContact?: string
  emergencyContactPhone?: string

  // Metadata
  createdAt?: any
  updatedAt?: any
  isComplete?: boolean
}

export const saveUserSettings = async (userId: string, settings: Partial<UserSettings>) => {
  try {
    const userSettingsRef = doc(db, "user-settings", userId)
    const settingsData = {
      ...settings,
      userId,
      updatedAt: serverTimestamp(),
    }

    // Check if document exists
    const docSnap = await getDoc(userSettingsRef)

    if (docSnap.exists()) {
      await updateDoc(userSettingsRef, settingsData)
    } else {
      await setDoc(userSettingsRef, {
        ...settingsData,
        isComplete: false,
        createdAt: serverTimestamp(),
      })
    }

    return { success: true }
  } catch (error) {
    console.error("Error saving user settings:", error)
    throw new Error("Failed to save user settings")
  }
}

export const getUserSettings = async (userId: string): Promise<UserSettings | null> => {
  try {
    const userSettingsRef = doc(db, "user-settings", userId)
    const docSnap = await getDoc(userSettingsRef)

    if (docSnap.exists()) {
      return docSnap.data() as UserSettings
    }

    return null
  } catch (error) {
    console.error("Error getting user settings:", error)
    throw new Error("Failed to get user settings")
  }
}

export const markSettingsComplete = async (userId: string) => {
  try {
    const userSettingsRef = doc(db, "user-settings", userId)
    await updateDoc(userSettingsRef, {
      isComplete: true,
      updatedAt: serverTimestamp(),
    })

    return { success: true }
  } catch (error) {
    console.error("Error marking settings complete:", error)
    throw new Error("Failed to mark settings complete")
  }
}
