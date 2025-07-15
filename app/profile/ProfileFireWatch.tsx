import {
  AVAILABILITY_FIELD_OPTIONS,
  CERTIFICATION_FIELD_OPTIONS,
} from "@/lib/constants/form-options";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";

import { ArrayEditableField } from "@/lib/components/forms/ArrayEditableField";
import { EditableField } from "@/lib/components/forms/EditableField";
import { FireExtinguisherIcon } from "lucide-react";
import { FormFieldType } from "@/lib/constants/form-steps";
import { UserProfile } from "@/lib/types/user-profile";

interface ProfileFireWatchProps {
  profile: UserProfile;
  handleFieldUpdate: (field: string, value: any) => void;
}

export const ProfileFireWatch = ({
  profile,
  handleFieldUpdate,
}: ProfileFireWatchProps) => {
  const certificationOptions = Object.entries(CERTIFICATION_FIELD_OPTIONS).map(
    ([value, label]) => ({ value, label }),
  );

  const availabilityOptions = Object.entries(AVAILABILITY_FIELD_OPTIONS).map(
    ([value, label]) => ({ value, label }),
  );

  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-bold text-2xl flex items-center gap-1">
          <FireExtinguisherIcon />
          <span>Fire Watch Details</span>
        </h2>
        <p className="text-muted-foreground">
          <p className="text-muted-foreground">
            Provide your credentials, availability, and compensation
            expectations.
          </p>
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1"></CardTitle>
          <p className="text-muted-foreground">Some other text here</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Work Credentials
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField
                label="Years of Experience"
                value={profile.fireWatchConfig?.yearsExperience}
                field="fireWatchConfig.yearsExperience"
                type={FormFieldType.number}
                profile={profile}
                onUpdate={handleFieldUpdate}
                required
              />
              <ArrayEditableField
                label="Certifications"
                value={profile.fireWatchConfig?.certifications}
                field="fireWatchConfig.certifications"
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
                value={profile.fireWatchConfig?.availability}
                field="fireWatchConfig.availability"
                profile={profile}
                onUpdate={handleFieldUpdate}
                options={availabilityOptions}
              />
              <EditableField
                label="Service Radius (miles)"
                value={profile.fireWatchConfig?.serviceRadius}
                field="fireWatchConfig.serviceRadius"
                type={FormFieldType.number}
                profile={profile}
                onUpdate={handleFieldUpdate}
                required
              />
              <EditableField
                label="Hourly Rate ($)"
                value={profile.fireWatchConfig?.hourlyRate}
                field="fireWatchConfig.hourlyRate"
                type={FormFieldType.number}
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
