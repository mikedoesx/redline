import {
  AVAILABILITY_FIELD_OPTIONS,
  FREQUENCY_FIELD_OPTIONS,
  INDUSTRY_TYPE_FIELD_OPTIONS,
  US_STATE_LABELS,
} from "@/lib/constants/form-options";
import { Card, CardContent } from "@/lib/components/ui/card";

import { AppUser } from "@/lib/types/user-profile";
import { BriefcaseBusinessIcon } from "lucide-react";
import { EditableField } from "@/lib/components/forms/EditableField";
import { FormFieldType } from "@/lib/constants/form-steps";

interface ProfileClientProps {
  profile: AppUser;
  handleFieldUpdate: (field: string, value: any) => void;
}

export const ProfileClient = ({
  profile,
  handleFieldUpdate,
}: ProfileClientProps) => {
  const availabilityOptions = Object.entries(AVAILABILITY_FIELD_OPTIONS).map(
    ([value, label]) => ({ value, label }),
  );

  const industryTypeOptions = Object.entries(INDUSTRY_TYPE_FIELD_OPTIONS).map(
    ([value, label]) => ({ value, label }),
  );

  const frequencyNeededOptions = Object.entries(FREQUENCY_FIELD_OPTIONS).map(
    ([value, label]) => ({ value, label }),
  );

  const usStateOptions = Object.entries(US_STATE_LABELS).map(
    ([value, label]) => ({ value, label }),
  );

  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-bold text-2xl flex items-center gap-1">
          <BriefcaseBusinessIcon size={20} /> <span>Company Information</span>
        </h2>
        <p className="text-muted-foreground">
          Tell us about your organization and how we can best serve you.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6 mt-6">
          {/* Company Info */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Company Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField
                label="Company Name"
                value={profile.clientConfig?.companyName}
                field="clientConfig.companyName"
                type={FormFieldType.text}
                profile={profile}
                onUpdate={handleFieldUpdate}
                required
              />
              <EditableField
                label="Industry"
                value={profile.clientConfig?.industryType}
                field="clientConfig.industryType"
                type={FormFieldType.select}
                profile={profile}
                onUpdate={handleFieldUpdate}
                options={industryTypeOptions}
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Facility Location
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

          {/* Scheduling */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Scheduling Needs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField
                label="Facility Size"
                value={profile.clientConfig?.facilitySize}
                field="clientConfig.facilitySize"
                profile={profile}
                onUpdate={handleFieldUpdate}
                options={availabilityOptions}
              />
              <EditableField
                label="Typical Shift Length"
                value={profile.clientConfig?.typicalShiftLength}
                field="clientConfig.typicalShiftLength"
                type={FormFieldType.number}
                profile={profile}
                onUpdate={handleFieldUpdate}
              />
              <EditableField
                label="Frequency Needed"
                type={FormFieldType.select}
                value={profile.clientConfig?.frequencyNeeded ?? []}
                field="clientConfig.frequencyNeeded"
                profile={profile}
                onUpdate={handleFieldUpdate}
                options={frequencyNeededOptions}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
