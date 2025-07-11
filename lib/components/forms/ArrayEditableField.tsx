"use client";

import { Edit2, Save, X } from "lucide-react";
import { UserProfile, UserProfileService } from "@/lib/services/user-profile";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/lib/providers/auth-context";
import { useState } from "react";

interface EditableFieldProps {
  label: string;
  value: string | string[] | number | undefined;
  field: keyof UserProfile;
  type?: "text" | "email" | "tel" | "number" | "textarea" | "select";
  options?: { value: string; label: string }[];
  icon?: React.ReactNode;
  profile: UserProfile;
  onUpdate: (field: keyof UserProfile, value: any) => void;
}

export const ArrayEditableField = ({
  label,
  value,
  field,
  icon,
  profile,
  onUpdate,
}: Omit<EditableFieldProps, "type"> & { value?: string[] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState((value || []).join(", "));
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const userProfileService = UserProfileService.getInstance();

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const arrayValue = editValue
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item);
      await userProfileService.saveUserProfile(user.uid, {
        ...profile,
        [field]: arrayValue,
      });

      onUpdate(field, arrayValue);
      setIsEditing(false);
      toast.success(`${label} updated successfully`);
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      toast.error(`Failed to update ${label}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditValue((value || []).join(", "));
    setIsEditing(false);
  };

  const displayValue =
    value && value.length > 0 ? (
      <div className="flex flex-wrap gap-1">
        {value.map((item, index) => (
          <Badge key={index} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>
    ) : (
      "Not set"
    );

  return (
    <div className="flex items-start justify-between py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-start space-x-3 flex-1">
        {icon && <div className="text-gray-500 mt-1">{icon}</div>}
        <div className="flex-1">
          <div className="text-sm font-medium text-gray-700">{label}</div>
          {isEditing ? (
            <div className="mt-1">
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder="Enter items separated by commas"
                className="w-full"
                rows={2}
              />
              <div className="text-xs text-gray-500 mt-1">
                Separate multiple items with commas
              </div>
            </div>
          ) : (
            <div className="mt-1">{displayValue}</div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-1">
        {isEditing ? (
          <>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isLoading}
              className="h-8 w-8 p-0"
            >
              <Save className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="h-8 w-8 p-0 bg-transparent"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 p-0"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
