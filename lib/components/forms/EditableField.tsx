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
import { FormFieldType } from "@/lib/constants/form-steps";
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
  type?: FormFieldType;
  options?: { value: string; label: string }[];
  icon?: React.ReactNode;
  profile: UserProfile;
  onUpdate: (field: keyof UserProfile, value: any) => void;
  disabled?: boolean;
  required?: boolean;
}

export const EditableField = ({
  label,
  value,
  field,
  type = FormFieldType.text,
  options,
  icon,
  profile,
  onUpdate,
  disabled = false,
  required = false,
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value?.toString() || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const userProfileService = UserProfileService.getInstance();

  const validateField = (
    field: keyof UserProfile,
    value: any,
  ): string | null => {
    if (required && (!value || value === "")) {
      return "This field is required.";
    }

    switch (field) {
      case "firstName":
      case "lastName":
        return value?.trim() ? null : "This field is required.";
      case "email":
        return /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email format.";
      case "phoneNumber":
        return value?.length >= 10 ? null : "Phone number is too short.";
      case "hourlyRate":
        return Number(value) > 0 ? null : "Rate must be greater than 0.";
      default:
        return null;
    }
  };

  const handleSave = async () => {
    if (!user) return;

    const updatedValue = type === "number" ? Number(editValue) : editValue;
    const validationError = validateField(field, updatedValue);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      await userProfileService.saveUserProfile(user.uid, {
        ...profile,
        [field]: updatedValue,
      });

      onUpdate(field, updatedValue);
      setIsEditing(false);
      setError(null);
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
    <div
      className={`flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-lg transition-colors ${
        required && !value ? "bg-red-50" : ""
      }`}
    >
      <div className="flex items-center space-x-2 flex-1">
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <div className="flex-1">
          <Label>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          {isEditing ? (
            <div className="mt-1 space-y-1">
              {type === FormFieldType.select && options ? (
                <Select
                  value={editValue}
                  onValueChange={setEditValue}
                  disabled={disabled}
                >
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
                  disabled={disabled}
                />
              ) : (
                <Input
                  type={type}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full"
                  disabled={disabled}
                />
              )}

              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          ) : (
            <div className="text-foreground mt-1">{displayValue}</div>
          )}
        </div>

        <div className="flex items-center space-x-2 self-start mt-2">
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
            !disabled && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
