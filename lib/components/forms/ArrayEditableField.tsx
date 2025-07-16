"use client";

import { Edit2, Save, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { AppUser } from "@/lib/types/user-profile";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FormFieldType } from "@/lib/constants/form-steps";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { useAppUser } from "@/lib/hooks/use-user-profile";
import { useAuth } from "@/lib/providers/auth-context";
import { useState } from "react";

interface ArrayEditableFieldProps {
  label: string;
  value: string[] | undefined;
  field: string;
  type?: FormFieldType;
  options: { value: string; label: string }[];
  profile: AppUser;
  disabled?: boolean;
  required?: boolean;
  onUpdate: (field: string, value: any) => void;
}

export const ArrayEditableField = ({
  label,
  value,
  field,
  options,
  profile,
  disabled = false,
  required = false,
  onUpdate,
}: Omit<ArrayEditableFieldProps, "type">) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValues, setCurrentValues] = useState<string[]>(value || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { saveAppUser } = useAppUser();

  const validate = () => {
    if (required && currentValues.length === 0) {
      setError("Please select at least one item.");
      return null;
    }
    return currentValues;
  };

  const handleSave = async () => {
    if (!user) return;

    const arrayValue = validate();
    if (!arrayValue) return;

    if (arrayValue.length === 0) {
      setError("Please enter at least one item.");
      return;
    }

    setIsLoading(true);
    try {
      // Create a shallow copy of the profile
      const updatedProfile = { ...profile };

      // Support dot-notation like "fireWatchConfig.yearsExperience"
      const keys = field.split(".");
      let current: any = updatedProfile;

      // Traverse and build nested structure
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) current[key] = {};
        current = current[key];
      }

      // Set the value at the target key
      current[keys[keys.length - 1]] = arrayValue;

      // Save updated profile
      await saveAppUser(user.uid, updatedProfile);

      onUpdate(field, arrayValue);
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
    setCurrentValues(value || []);
    setIsEditing(false);
    setError(null);
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
      ""
    );

  return (
    <div className={`flex items-start justify-between relative`}>
      <div className="flex items-start space-x-3 flex-1">
        <div className={`flex-1 ${isEditing ? "mr-20" : ""}`}>
          <Label>
            {label} {required && <span className="text-red-500">*</span>}
          </Label>
          {isEditing ? (
            <div className="mt-1 space-y-1">
              <Select
                onValueChange={(val) => {
                  if (!currentValues.includes(val)) {
                    const newVals = [...currentValues, val];
                    setCurrentValues(newVals);
                  }
                }}
                disabled={disabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select options" />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      disabled={currentValues.includes(opt.value)}
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {currentValues.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentValues.map((val) => {
                    const opt = options?.find((o) => o.value === val);
                    return (
                      <Badge
                        key={val}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {opt?.label || val}
                        {!disabled && (
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => {
                              const updated = currentValues.filter(
                                (v) => v !== val,
                              );
                              setCurrentValues(updated);
                            }}
                          />
                        )}
                      </Badge>
                    );
                  })}
                </div>
              )}

              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          ) : (
            <div className="mr-10">
              <Select disabled={true}>
                <SelectTrigger>
                  <SelectValue placeholder="Select options" />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      disabled={currentValues.includes(opt.value)}
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-0 right-0 mt-7">
        {isEditing ? (
          <div className="flex items-center space-x-2 mt-1">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isLoading || disabled}
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
          </div>
        ) : (
          !disabled && (
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-8 w-8 p-0"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
