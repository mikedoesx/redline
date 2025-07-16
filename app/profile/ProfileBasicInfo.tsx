"use client";

import { Card, CardContent } from "@/lib/components/ui/card";
import {
  USER_TYPE_FIELD_OPTIONS,
  US_STATE_LABELS,
} from "@/lib/constants/form-options";

import { AppUser } from "@/lib/types/user-profile";
import { EditableField } from "@/lib/components/forms/EditableField";
import { FormFieldType } from "@/lib/constants/form-steps";
import { IdCardIcon } from "lucide-react";
import { useAppUser } from "@/lib/hooks/use-user-profile";

interface ProfileBasicInfoProps {
  profile: AppUser;
  handleFieldUpdate: (field: string, value: any) => void;
}

export const ProfileBasicInfo = ({
  profile,
  handleFieldUpdate,
}: ProfileBasicInfoProps) => {
  const userTypeOptions = Object.entries(USER_TYPE_FIELD_OPTIONS).map(
    ([value, label]) => ({ value, label }),
  );

  const { isPendingReview } = useAppUser();
  const usStateOptions = Object.entries(US_STATE_LABELS).map(
    ([value, label]) => ({ value, label }),
  );

  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-bold text-2xl flex items-center gap-1">
          <IdCardIcon />
          <span>Basic Information</span>
        </h2>
        <p className="text-muted-foreground">
          Let us know who you are so we can build your profile.
        </p>
      </div>
      <Card>
        <CardContent className="space-y-6 mt-6">
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
                profile={profile}
                onUpdate={handleFieldUpdate}
                disabled={isPendingReview}
                required
              />
              <EditableField
                label="Last Name"
                value={profile.lastName}
                field="lastName"
                type={FormFieldType.text}
                profile={profile}
                onUpdate={handleFieldUpdate}
                disabled={isPendingReview}
                required
              />
              <EditableField
                label="Email"
                value={profile.email}
                field="email"
                type={FormFieldType.email}
                profile={profile}
                onUpdate={handleFieldUpdate}
                disabled
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
                profile={profile}
                onUpdate={handleFieldUpdate}
                disabled={isPendingReview}
                required
              />
              <EditableField
                label="User Type"
                value={profile.userType}
                field="userType"
                type={FormFieldType.select}
                options={userTypeOptions}
                profile={profile}
                onUpdate={handleFieldUpdate}
                disabled={isPendingReview}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField
                label="Street Address"
                value={profile.clientConfig?.address?.street}
                field="clientConfig.address.street"
                type={FormFieldType.text}
                profile={profile}
                onUpdate={handleFieldUpdate}
                required
              />
              <EditableField
                label="Building No."
                value={profile.clientConfig?.address?.street2}
                field="clientConfig.address.building"
                type={FormFieldType.text}
                profile={profile}
                onUpdate={handleFieldUpdate}
              />
              <EditableField
                label="City"
                value={profile.clientConfig?.address?.city}
                field="clientConfig.address.city"
                type={FormFieldType.text}
                profile={profile}
                onUpdate={handleFieldUpdate}
                required
              />
              <EditableField
                label="State"
                value={profile.clientConfig?.address?.state}
                field="clientConfig.address.state"
                type={FormFieldType.select}
                profile={profile}
                onUpdate={handleFieldUpdate}
                options={usStateOptions}
                required
              />
              <EditableField
                label="ZIP Code"
                value={profile.clientConfig?.address?.zipCode}
                field="clientConfig.address.zipCode"
                type={FormFieldType.text}
                profile={profile}
                onUpdate={handleFieldUpdate}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
