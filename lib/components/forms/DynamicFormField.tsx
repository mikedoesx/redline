"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import type { Control } from "react-hook-form";
import type { FormField as FormFieldType } from "@/lib/form-validators/form-steps";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { X } from "lucide-react";
import { useState } from "react";

interface DynamicFormFieldProps {
  control: Control<any>;
  field: FormFieldType;
  disabled?: boolean;
}

export const DynamicFormField = ({
  control,
  field,
  disabled = false,
}: DynamicFormFieldProps) => {
  const [multiSelectValues, setMultiSelectValues] = useState<string[]>([]);

  const renderField = (fieldValue: any, onChange: (value: any) => void) => {
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={fieldValue || ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled || field.isDisabled}
          />
        );

      case "number":
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            value={fieldValue || ""}
            onChange={(e) => onChange(Number.parseFloat(e.target.value) || 0)}
            disabled={disabled || field.isDisabled}
          />
        );

      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            value={fieldValue || ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled || field.isDisabled}
          />
        );

      case "select":
        return (
          <Select
            value={fieldValue || ""}
            onValueChange={onChange}
            disabled={disabled || field.isDisabled}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={field.placeholder || "Select an option"}
              />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "multiselect":
        const currentValues = fieldValue || [];
        return (
          <div className="space-y-3">
            <Select
              onValueChange={(value) => {
                if (!currentValues.includes(value)) {
                  const newValues = [...currentValues, value];
                  onChange(newValues);
                  setMultiSelectValues(newValues);
                }
              }}
              disabled={disabled || field.isDisabled}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={field.placeholder || "Select options"}
                />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={currentValues.includes(option.value)}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {currentValues.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentValues.map((value: string) => {
                  const option = field.options?.find(
                    (opt) => opt.value === value,
                  );
                  return (
                    <Badge
                      key={value}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {option?.label || value}
                      {!disabled && (
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => {
                            const newValues = currentValues.filter(
                              (v: string) => v !== value,
                            );
                            onChange(newValues);
                            setMultiSelectValues(newValues);
                          }}
                        />
                      )}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        );

      case "radio":
        return (
          <RadioGroup
            value={fieldValue || ""}
            onValueChange={onChange}
            disabled={disabled || field.isDisabled}
          >
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${field.name}-${option.value}`}
                />
                <label
                  htmlFor={`${field.name}-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        );

      case "checkbox":
        return (
          <div className="space-y-3">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`${field.name}-${option.value}`}
                  checked={(fieldValue || []).includes(option.value)}
                  onCheckedChange={(checked) => {
                    const currentValues = fieldValue || [];
                    if (checked) {
                      onChange([...currentValues, option.value]);
                    } else {
                      onChange(
                        currentValues.filter((v: string) => v !== option.value),
                      );
                    }
                  }}
                  disabled={disabled || field.isDisabled}
                />
                <label
                  htmlFor={`${field.name}-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );

      case "date":
        return (
          <Input
            type="date"
            value={fieldValue || ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled || field.isDisabled}
          />
        );

      default:
        return (
          <Input
            type="text"
            placeholder={field.placeholder}
            value={fieldValue || ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled || field.isDisabled}
          />
        );
    }
  };

  return (
    <FormField
      control={control}
      name={field.name}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel
            className={
              field.required
                ? "after:content-['*'] after:text-red-500 after:ml-1"
                : ""
            }
          >
            {field.label}
          </FormLabel>
          <FormControl>
            {renderField(formField.value, formField.onChange)}
          </FormControl>
          {field.description && (
            <FormDescription>{field.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
