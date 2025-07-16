import {
  CONTACT_METHOD_FIELD_OPTIONS,
  NOTIFICATION_FIELD_OPTIONS,
  TIMEZONE_FIELD_OPTIONS,
} from "@/lib/constants/form-options";
import { Card, CardContent } from "@/lib/components/ui/card";

import { AppUser } from "@/lib/types/user-profile";
import { ArrayEditableField } from "@/lib/components/forms/ArrayEditableField";
import { EditableField } from "@/lib/components/forms/EditableField";
import { FormFieldType } from "@/lib/constants/form-steps";
import { PhoneIcon } from "lucide-react";

interface ProfileContactPreferencesProps {
  profile: AppUser;
  handleFieldUpdate: (field: string, value: any) => void;
}

export const ProfileContactPreferences = ({
  profile,
  handleFieldUpdate,
}: ProfileContactPreferencesProps) => {
  const contactMethodOptions = Object.entries(CONTACT_METHOD_FIELD_OPTIONS).map(
    ([value, label]) => ({ value, label }),
  );

  const timezoneOptions = Object.entries(TIMEZONE_FIELD_OPTIONS).map(
    ([value, label]) => ({ value, label }),
  );

  const notificationOptions = Object.entries(NOTIFICATION_FIELD_OPTIONS).map(
    ([value, label]) => ({ value, label }),
  );

  return (
    <div className="space-y-2">
      <div>
        <h2 className="font-bold text-2xl flex items-center gap-1">
          <PhoneIcon size={20} />
          <span>Contact Preferences</span>
        </h2>
        <p className="text-muted-foreground">
          How you&apos;d like us to reach you and when.
        </p>
      </div>

      <Card>
        <CardContent className="space-y-6 mt-6">
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
                profile={profile}
                onUpdate={handleFieldUpdate}
                required
              />
              <ArrayEditableField
                label="Notification Preferences"
                value={profile.notifications}
                field="notifications"
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
                profile={profile}
                onUpdate={handleFieldUpdate}
              />
              <EditableField
                label="Emergency Contact Phone"
                value={profile.emergencyContactPhone}
                field="emergencyContactPhone"
                type={FormFieldType.tel}
                profile={profile}
                onUpdate={handleFieldUpdate}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
