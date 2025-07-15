import { Card, CardContent } from "@/lib/components/ui/card";

import { EditableField } from "@/lib/components/forms/EditableField";
import { FormFieldType } from "@/lib/constants/form-steps";
import { JURISDICTION_TYPE_FIELD_OPTIONS } from "@/lib/constants/form-options";
import { LocateFixedIcon } from "lucide-react";
import { UserProfile } from "@/lib/types/user-profile";

interface ProfileAHGOfficialProps {
  profile: UserProfile;
  handleFieldUpdate: (field: string, value: any) => void;
}

export const ProfileAHJOfficial = ({
  profile,
  handleFieldUpdate,
}: ProfileAHGOfficialProps) => {
  const jurisdictionOptions = Object.entries(
    JURISDICTION_TYPE_FIELD_OPTIONS,
  ).map(([value, label]) => ({ value, label }));

  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-bold text-2xl flex items-center gap-1">
          <LocateFixedIcon size={20} />
          <span>Jurisdiction Details</span>
        </h2>
        <p className="text-muted-foreground">
          Help us understand your agency and your authority level.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <EditableField
              label="Jurisdiction Name"
              value={profile.ahjConfig?.organization?.name}
              field="organizationName"
              type={FormFieldType.text}
              profile={profile}
              onUpdate={handleFieldUpdate}
              required
            />
            <EditableField
              label="Jurisdiction Type"
              value={profile.ahjConfig?.jurisdictionType}
              field="jurisdictionType"
              type={FormFieldType.select}
              options={jurisdictionOptions}
              profile={profile}
              onUpdate={handleFieldUpdate}
              required
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
