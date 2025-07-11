"use client";

import type React from "react";

import { useState } from "react";
import {
  Edit2,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Shield,
  Award,
} from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { toast } from "sonner";
import {
  type UserProfile,
  UserProfileService,
} from "@/lib/services/user-profile";
import { useAuth } from "@/lib/providers/auth-context";
import { useProfileCheck } from "@/lib/hooks/use-profile-check";
import { UserTypeOptions } from "@/lib/constants/form-options";
import { EditableField } from "../../forms/EditableField";
import { ArrayEditableField } from "../../forms/ArrayEditableField";

export const ProfileView = () => {
  const { profile, setProfile } = useProfileCheck();
  const handleFieldUpdate = (field: keyof UserProfile, value: any) => {
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile);
  };

  const getUserTypeLabel = (userType: UserTypeOptions) => {
    switch (userType) {
      case UserTypeOptions.FIRE_WATCH:
        return "Fire Watch Personnel";
      case UserTypeOptions.FIRE_WATCH_CLIENT:
        return "Client";
      case UserTypeOptions.FIRE_WATCH_ADMIN:
        return "Administrator";
      case UserTypeOptions.AHJ_OFFICIAL:
        return "Authority Having Jurisdiction";
      default:
        return userType;
    }
  };

  const userTypeOptions = [
    { value: "fire-watch", label: "Fire Watch Personnel" },
    { value: "client", label: "Client" },
    { value: "fire-watch-admin", label: "Administrator" },
    { value: "ahj", label: "Authority Having Jurisdiction" },
  ];

  const availabilityOptions = [
    { value: "weekdays", label: "Weekdays" },
    { value: "weekends", label: "Weekends" },
    { value: "nights", label: "Nights" },
    { value: "24/7", label: "24/7" },
  ];

  const contactMethodOptions = [
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "text", label: "Text Message" },
  ];

  const timezoneOptions = [
    { value: "EST", label: "Eastern Time" },
    { value: "CST", label: "Central Time" },
    { value: "MST", label: "Mountain Time" },
    { value: "PST", label: "Pacific Time" },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-gray-600 mt-2">Manage your profile information</p>
        <Badge variant="default" className="mt-2">
          {getUserTypeLabel(profile.userType)}
        </Badge>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Basic Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <EditableField
            label="First Name"
            value={profile.firstName}
            field="firstName"
            icon={<User className="h-4 w-4" />}
            profile={profile}
            onUpdate={handleFieldUpdate}
          />
          <Separator />
          <EditableField
            label="Last Name"
            value={profile.lastName}
            field="lastName"
            icon={<User className="h-4 w-4" />}
            profile={profile}
            onUpdate={handleFieldUpdate}
          />
          <Separator />
          <EditableField
            label="Email"
            value={profile.email}
            field="email"
            type="email"
            icon={<Mail className="h-4 w-4" />}
            profile={profile}
            onUpdate={handleFieldUpdate}
          />
          <Separator />
          <EditableField
            label="Phone Number"
            value={profile.phoneNumber}
            field="phoneNumber"
            type="tel"
            icon={<Phone className="h-4 w-4" />}
            profile={profile}
            onUpdate={handleFieldUpdate}
          />
          <Separator />
          <EditableField
            label="User Type"
            value={profile.userType}
            field="userType"
            type="select"
            options={userTypeOptions}
            icon={<Shield className="h-4 w-4" />}
            profile={profile}
            onUpdate={handleFieldUpdate}
          />
        </CardContent>
      </Card>

      {/* Fire Watch Specific Fields */}
      {profile.userType === UserTypeOptions.FIRE_WATCH && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Fire Watch Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <EditableField
              label="Years of Experience"
              value={profile.yearsExperience}
              field="yearsExperience"
              type="number"
              icon={<Clock className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <ArrayEditableField
              label="Certifications"
              value={profile.certifications}
              field="certifications"
              icon={<Award className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <ArrayEditableField
              label="Availability"
              value={profile.availability}
              field="availability"
              icon={<Clock className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <EditableField
              label="Service Radius (miles)"
              value={profile.serviceRadius}
              field="serviceRadius"
              type="number"
              icon={<MapPin className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <EditableField
              label="Hourly Rate ($)"
              value={profile.hourlyRate}
              field="hourlyRate"
              type="number"
              icon={<DollarSign className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
          </CardContent>
        </Card>
      )}

      {/* Client Specific Fields */}
      {profile.userType === UserTypeOptions.FIRE_WATCH_CLIENT && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Client Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <EditableField
              label="Company Name"
              value={profile.companyName}
              field="companyName"
              icon={<Building className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <EditableField
              label="Industry Type"
              value={profile.industryType}
              field="industryType"
              icon={<Building className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <EditableField
              label="Facility Size (sq ft)"
              value={profile.facilitySize}
              field="facilitySize"
              type="number"
              icon={<MapPin className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <EditableField
              label="Typical Shift Length"
              value={profile.typicalShiftLength}
              field="typicalShiftLength"
              icon={<Clock className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <EditableField
              label="Frequency Needed"
              value={profile.frequencyNeeded}
              field="frequencyNeeded"
              icon={<Clock className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
          </CardContent>
        </Card>
      )}

      {/* Admin Specific Fields */}
      {profile.userType === UserTypeOptions.FIRE_WATCH_ADMIN && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Administrator Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <EditableField
              label="Organization Name"
              value={profile.organizationName}
              field="organizationName"
              icon={<Building className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <EditableField
              label="Admin Level"
              value={profile.adminLevel}
              field="adminLevel"
              icon={<Shield className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <EditableField
              label="Managed Staff Count"
              value={profile.managedStaff}
              field="managedStaff"
              type="number"
              icon={<User className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <ArrayEditableField
              label="Service Areas"
              value={profile.serviceAreas}
              field="serviceAreas"
              icon={<MapPin className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <EditableField
              label="Years in Management"
              value={profile.yearsInManagement}
              field="yearsInManagement"
              type="number"
              icon={<Clock className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
          </CardContent>
        </Card>
      )}

      {/* AHJ Specific Fields */}
      {profile.userType === UserTypeOptions.AHJ_OFFICIAL && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Authority Having Jurisdiction Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <EditableField
              label="Jurisdiction"
              value={profile.jurisdiction}
              field="jurisdiction"
              icon={<MapPin className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <EditableField
              label="Position"
              value={profile.position}
              field="position"
              icon={<Shield className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <EditableField
              label="Badge Number"
              value={profile.badgeNumber}
              field="badgeNumber"
              icon={<Award className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <EditableField
              label="Jurisdiction Type"
              value={profile.jurisdictionType}
              field="jurisdictionType"
              icon={<Building className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <ArrayEditableField
              label="Authority Levels"
              value={profile.authorityLevel}
              field="authorityLevel"
              icon={<Shield className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
            <Separator />
            <EditableField
              label="Years in Position"
              value={profile.yearsInPosition}
              field="yearsInPosition"
              type="number"
              icon={<Clock className="h-4 w-4" />}
              profile={profile}
              onUpdate={handleFieldUpdate}
            />
          </CardContent>
        </Card>
      )}

      {/* Contact Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Contact Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <EditableField
            label="Preferred Contact Method"
            value={profile.preferredContactMethod}
            field="preferredContactMethod"
            type="select"
            options={contactMethodOptions}
            icon={<Mail className="h-4 w-4" />}
            profile={profile}
            onUpdate={handleFieldUpdate}
          />
          <Separator />
          <EditableField
            label="Timezone"
            value={profile.timezone}
            field="timezone"
            type="select"
            options={timezoneOptions}
            icon={<Clock className="h-4 w-4" />}
            profile={profile}
            onUpdate={handleFieldUpdate}
          />
          <Separator />
          <ArrayEditableField
            label="Notification Preferences"
            value={profile.notifications}
            field="notifications"
            icon={<Mail className="h-4 w-4" />}
            profile={profile}
            onUpdate={handleFieldUpdate}
          />
          <Separator />
          <EditableField
            label="Emergency Contact"
            value={profile.emergencyContact}
            field="emergencyContact"
            icon={<User className="h-4 w-4" />}
            profile={profile}
            onUpdate={handleFieldUpdate}
          />
          <Separator />
          <EditableField
            label="Emergency Contact Phone"
            value={profile.emergencyContactPhone}
            field="emergencyContactPhone"
            type="tel"
            icon={<Phone className="h-4 w-4" />}
            profile={profile}
            onUpdate={handleFieldUpdate}
          />
        </CardContent>
      </Card>
    </div>
  );
};
