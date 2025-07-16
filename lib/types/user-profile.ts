import { FieldValue } from "firebase/firestore";
import { IndustryTypeOptions } from "../constants/form-options";

export enum AppUserRole {
  FIRE_WATCH = "fire-watch",
  FIRE_WATCH_CLIENT = "fire-watch-client",
  FIRE_WATCH_ADMIN = "fire-watch-admin",
  AHJ_OFFICIAL = "ahj-official",
}

export enum AppUserStatus {
  incomplete = "incomplete",
  pendingReview = "pending-review",
  complete = "complete",
}

export const INITIAL_USER_PROFILE: AppUser = {
  uid: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  imageUrl: "",
  userType: AppUserRole.FIRE_WATCH,
  status: AppUserStatus.incomplete,
  address: {
    street: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  clientConfig: null,
  fireWatchConfig: null,
  ahjConfig: null,
  adminConfig: null,
};

export interface AddressFields {
  street: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface ClientConfig {
  companyName?: string;
  industryType?: IndustryTypeOptions;
  facilitySize?: number;
  typicalShiftLength?: string;
  frequencyNeeded?: string;
  address: AddressFields;
}

export interface FireWatchConfig {
  yearsExperience?: number;
  certifications?: string[];
  availability?: string[];
  serviceRadius?: number;
  hourlyRate?: number;
}

export interface AHJConfig {
  jurisdiction?: string;
  position?: string;
  badgeNumber?: string;
  jurisdictionType?: string;
  yearsInPosition?: number;
  organization?: {
    name: string;
    address: AddressFields;
  };
}

export interface AdminConfig {
  clientAdmin: string[]; // array of ids of the clients that this user is admin for
  fireWatchAdmin: string[]; // array of ids of the fire watchers that this user is admin for
  ahjAdmin: string[]; // array of ids the the ahj officials that this user is admin for
  superAdmin: boolean;
}

export interface AppUser {
  uid: string;

  // ID
  firstName: string;
  lastName: string;
  email: string;
  address: AddressFields;
  phoneNumber: string;
  imageUrl: string;

  // Configs
  userType: AppUserRole;
  clientConfig: ClientConfig | null;
  fireWatchConfig: FireWatchConfig | null;
  ahjConfig: AHJConfig | null;
  adminConfig: AdminConfig | null;

  // Contact preferences
  preferredContactMethod?: string;
  timezone?: string;
  notifications?: string[];
  emergencyContact?: string;
  emergencyContactPhone?: string;

  // Metadata
  status: AppUserStatus;
  createdAt?: FieldValue;
  updatedAt?: FieldValue;
}
