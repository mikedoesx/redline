"use client";

import { Edit2, Save, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { UserProfile, UserProfileService } from "@/lib/services/user-profile";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/lib/providers/auth-context";
import { useState } from "react";

interface EditableFieldProps {
  label: string;
  value: string | string[] | number | undefined;
  field: keyof UserProfile;
  type?:
    | "text"
    | "email"
    | "tel"
    | "number"
    | "textarea"
    | FormFieldType.select;
  options?: { value: string; label: string }[];
  icon?: React.ReactNode;
  profile: UserProfile;
  onUpdate: (field: keyof UserProfile, value: any) => void;
}

export const EditableField = ({
  label,
  value,
  field,
  type = "text",
  options,
  icon,
  profile,
  onUpdate,
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value?.toString() || "");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const userProfileService = UserProfileService.getInstance();

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const updatedValue = type === "number" ? Number(editValue) : editValue;
      await userProfileService.saveUserProfile(user.uid, {
        ...profile,
        [field]: updatedValue,
      });

      onUpdate(field, updatedValue);
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
    setEditValue(value?.toString() || "");
    setIsEditing(false);
  };

  const displayValue = value || "Not set";

  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center space-x-2 flex-1">
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <div className="flex-1">
          <Label>{label}</Label>
          {isEditing ? (
            <div className="mt-1">
              {type === FormFieldType.select && options ? (
                <Select value={editValue} onValueChange={setEditValue}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : type === "textarea" ? (
                <Textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full"
                  rows={3}
                />
              ) : (
                <Input
                  type={type}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full"
                />
              )}
            </div>
          ) : (
            <div className="text-foreground mt-1">{displayValue}</div>
          )}
        </div>

        <div className="flex items-center space-x-2">
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
    </div>
  );
};
