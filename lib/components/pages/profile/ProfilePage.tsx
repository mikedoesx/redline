"use client";

import {
  AVAILABILITY_LABELS,
  CERTIFICATION_LABELS,
  CONTACT_METHOD_LABELS,
  NOTIFICATION_LABELS,
  TIMEZONE_LABELS,
} from "@/lib/constants/form-options";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import {
  Award,
  Clock,
  DollarSign,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

import { ArrayEditableField } from "../../forms/ArrayEditableField";
import { Badge } from "../../ui/badge";
import { EditableField } from "../../forms/EditableField";
import { FormFieldType } from "@/lib/constants/form-steps";
import { UserProfile } from "@/lib/services/user-profile";
import { UserTypeOptions } from "@/lib/constants/form-options";
import { useProfileCheck } from "@/lib/hooks/use-profile-check";

export const ProfilePage = () => {
  const { profile, hasCompleteProfile, setProfile } = useProfileCheck();

  const handleFieldUpdate = (field: keyof UserProfile, value: any) => {
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile as UserProfile);
  };

  if (!profile) return null;

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
    { value: UserTypeOptions.FIRE_WATCH, label: "Fire Watch Personnel" },
    { value: UserTypeOptions.FIRE_WATCH_CLIENT, label: "Client" },
    { value: UserTypeOptions.FIRE_WATCH_ADMIN, label: "Administrator" },
    {
      value: UserTypeOptions.AHJ_OFFICIAL,
      label: "Authority Having Jurisdiction",
    },
  ];

  const contactMethodOptions = Object.entries(CONTACT_METHOD_LABELS).map(
    ([value, label]) => ({ value, label }),
  );

  const timezoneOptions = Object.entries(TIMEZONE_LABELS).map(
    ([value, label]) => ({ value, label }),
  );

  const certificationOptions = Object.entries(CERTIFICATION_LABELS).map(
    ([value, label]) => ({ value, label }),
  );

  const notificationOptions = Object.entries(NOTIFICATION_LABELS).map(
    ([value, label]) => ({ value, label }),
  );

  const availabilityOptions = Object.entries(AVAILABILITY_LABELS).map(
    ([value, label]) => ({ value, label }),
  );

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-8">
        <header className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Profile</h1>
            <Badge variant="default">
              {getUserTypeLabel(profile.userType)}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Manage your profile information below to get started.
          </p>
        </header>

        {!hasCompleteProfile && (
          <Alert variant="destructive">
            <AlertTitle>Profile Incomplete</AlertTitle>
            <AlertDescription>
              To access scheduling and assignments, please complete all required
              fields.
            </AlertDescription>
          </Alert>
        )}

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Name & Identity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableField
                  label="First Name"
                  value={profile.firstName}
                  field="firstName"
                  type={FormFieldType.text}
                  icon={<User className="h-4 w-4" />}
                  profile={profile}
                  onUpdate={handleFieldUpdate}
                  required
                />
                <EditableField
                  label="Last Name"
                  value={profile.lastName}
                  field="lastName"
                  type={FormFieldType.text}
                  icon={<User className="h-4 w-4" />}
                  profile={profile}
                  onUpdate={handleFieldUpdate}
                  required
                />
                <EditableField
                  label="Email"
                  value={profile.email}
                  field="email"
                  type={FormFieldType.email}
                  icon={<Mail className="h-4 w-4" />}
                  profile={profile}
                  disabled
                  onUpdate={handleFieldUpdate}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Contact Info
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableField
                  label="Phone Number"
                  value={profile.phoneNumber}
                  field="phoneNumber"
                  type={FormFieldType.tel}
                  icon={<Phone className="h-4 w-4" />}
                  profile={profile}
                  onUpdate={handleFieldUpdate}
                  required
                />
                <EditableField
                  label="User Type"
                  value={profile.userType}
                  field="userType"
                  type={FormFieldType.select}
                  options={userTypeOptions}
                  icon={<Shield className="h-4 w-4" />}
                  profile={profile}
                  onUpdate={handleFieldUpdate}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {profile.userType === UserTypeOptions.FIRE_WATCH && (
          <Card>
            <CardHeader>
              <CardTitle>Fire Watch Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Work Credentials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    label="Years of Experience"
                    value={profile.yearsExperience}
                    field="yearsExperience"
                    type={FormFieldType.number}
                    icon={<Clock className="h-4 w-4" />}
                    profile={profile}
                    onUpdate={handleFieldUpdate}
                    required
                  />
                  <ArrayEditableField
                    label="Certifications"
                    value={profile.certifications}
                    field="certifications"
                    icon={<Award className="h-4 w-4" />}
                    profile={profile}
                    onUpdate={handleFieldUpdate}
                    options={certificationOptions}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Logistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ArrayEditableField
                    label="Availability"
                    value={profile.availability}
                    field="availability"
                    icon={<Clock className="h-4 w-4" />}
                    profile={profile}
                    onUpdate={handleFieldUpdate}
                    options={availabilityOptions}
                  />
                  <EditableField
                    label="Service Radius (miles)"
                    value={profile.serviceRadius}
                    field="serviceRadius"
                    type={FormFieldType.number}
                    icon={<MapPin className="h-4 w-4" />}
                    profile={profile}
                    onUpdate={handleFieldUpdate}
                    required
                  />
                  <EditableField
                    label="Hourly Rate ($)"
                    value={profile.hourlyRate}
                    field="hourlyRate"
                    type={FormFieldType.number}
                    icon={<DollarSign className="h-4 w-4" />}
                    profile={profile}
                    onUpdate={handleFieldUpdate}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Contact Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Communication
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableField
                  label="Preferred Contact Method"
                  value={profile.preferredContactMethod}
                  field="preferredContactMethod"
                  type={FormFieldType.select}
                  options={contactMethodOptions}
                  icon={<Mail className="h-4 w-4" />}
                  profile={profile}
                  onUpdate={handleFieldUpdate}
                  required
                />
                <EditableField
                  label="Timezone"
                  value={profile.timezone}
                  field="timezone"
                  type={FormFieldType.select}
                  options={timezoneOptions}
                  icon={<Clock className="h-4 w-4" />}
                  profile={profile}
                  onUpdate={handleFieldUpdate}
                  required
                />
                <ArrayEditableField
                  label="Notification Preferences"
                  value={profile.notifications}
                  field="notifications"
                  icon={<Mail className="h-4 w-4" />}
                  profile={profile}
                  onUpdate={handleFieldUpdate}
                  options={notificationOptions}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Emergency
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EditableField
                  label="Emergency Contact"
                  value={profile.emergencyContact}
                  field="emergencyContact"
                  icon={<User className="h-4 w-4" />}
                  profile={profile}
                  onUpdate={handleFieldUpdate}
                />
                <EditableField
                  label="Emergency Contact Phone"
                  value={profile.emergencyContactPhone}
                  field="emergencyContactPhone"
                  type={FormFieldType.tel}
                  icon={<Phone className="h-4 w-4" />}
                  profile={profile}
                  onUpdate={handleFieldUpdate}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
