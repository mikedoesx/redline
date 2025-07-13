"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/components/ui/dialog";
import {
  FormFieldType,
  FormStep,
  INITIAL_FORM_FIELD,
  INITIAL_FORM_STEP,
} from "@/lib/constants/form-steps";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { Switch } from "@/lib/components/ui/switch";
import { Textarea } from "@/lib/components/ui/textarea";
import { XIcon } from "lucide-react";
import { useState } from "react";

export interface StepFormModalProps {
  step?: FormStep;
  onSave: (updatedStep: any) => void;
  triggerText?: string;
}

export function StepFormModal({
  step,
  onSave,
  triggerText,
}: StepFormModalProps) {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<FormStep>(
    () => step || INITIAL_FORM_STEP,
  );

  const handleSave = () => {
    onSave(formState);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"> {triggerText || "Edit Step"} </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{step ? "Edit Step" : "New Step"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formState.title}
              onChange={(e) =>
                setFormState({ ...formState, title: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formState.description}
              onChange={(e) =>
                setFormState({ ...formState, description: e.target.value })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="requiresReview">Requires Admin Review</Label>
            <Switch
              id="requiresReview"
              checked={formState.requiresReview}
              onCheckedChange={(value) =>
                setFormState({ ...formState, requiresReview: value })
              }
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Form Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formState.fields.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No fields added yet.
                </p>
              ) : (
                formState.fields.map((field, index) => (
                  <div
                    key={field.name}
                    className="border rounded p-4 space-y-2 bg-muted/10"
                  >
                    <div className="grid gap-2">
                      <Label>Label</Label>
                      <Input
                        value={field.label}
                        onChange={(e) => {
                          const updated = [...formState.fields];
                          updated[index].label = e.target.value;
                          setFormState({ ...formState, fields: updated });
                        }}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Name</Label>
                      <Input
                        value={field.name}
                        onChange={(e) => {
                          const updated = [...formState.fields];
                          updated[index].name = e.target.value;
                          setFormState({ ...formState, fields: updated });
                        }}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Type</Label>
                      <Select
                        value={field.type}
                        onValueChange={(value: FormFieldType) => {
                          const updated = [...formState.fields];
                          updated[index].type = value as any;
                          updated[index].options = [
                            {
                              value: FormFieldType.select,
                              label: FormFieldType.select,
                            },
                            {
                              value: FormFieldType.multiselect,
                              label: FormFieldType.multiselect,
                            },
                            {
                              value: FormFieldType.radio,
                              label: FormFieldType.radio,
                            },
                            {
                              value: FormFieldType.checkbox,
                              label: FormFieldType.checkbox,
                            },
                          ].some((it) => it.value === value)
                            ? [{ label: "Option 1", value: "option1" }]
                            : [];
                          setFormState({ ...formState, fields: updated });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a field type" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "text",
                            "email",
                            "tel",
                            "number",
                            "textarea",
                            FormFieldType.select,
                            FormFieldType.multiselect,
                            FormFieldType.radio,
                            FormFieldType.checkbox,
                            "date",
                          ].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {[
                      FormFieldType.select,
                      FormFieldType.multiselect,
                      FormFieldType.radio,
                      FormFieldType.checkbox,
                    ].includes(field.type) && (
                      <div className="grid gap-2">
                        <Label>Options</Label>
                        <div className="space-y-2">
                          {(field.options || []).map((opt, optIndex) => (
                            <div
                              key={optIndex}
                              className="flex items-center gap-2"
                            >
                              <Input
                                value={opt.label}
                                placeholder="Label"
                                onChange={(e) => {
                                  const updated = [...formState.fields];
                                  updated[index].options![optIndex].label =
                                    e.target.value;
                                  setFormState({
                                    ...formState,
                                    fields: updated,
                                  });
                                }}
                              />
                              <Input
                                value={opt.value}
                                placeholder="Value"
                                onChange={(e) => {
                                  const updated = [...formState.fields];
                                  updated[index].options![optIndex].value =
                                    e.target.value;
                                  setFormState({
                                    ...formState,
                                    fields: updated,
                                  });
                                }}
                              />
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  const updated = [...formState.fields];
                                  updated[index].options!.splice(optIndex, 1);
                                  setFormState({
                                    ...formState,
                                    fields: updated,
                                  });
                                }}
                              >
                                <XIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updated = [...formState.fields];
                            updated[index].options?.push({
                              label: `Option ${updated[index].options!.length + 1}`,
                              value: `option${updated[index].options!.length + 1}`,
                            });
                            setFormState({ ...formState, fields: updated });
                          }}
                        >
                          + Add Option
                        </Button>
                      </div>
                    )}

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        const updated = [...formState.fields];
                        updated.splice(index, 1);
                        setFormState({ ...formState, fields: updated });
                      }}
                    >
                      Delete Field
                    </Button>
                  </div>
                ))
              )}

              <Button
                variant="outline"
                onClick={() => {
                  setFormState({
                    ...formState,
                    fields: [...formState.fields, INITIAL_FORM_FIELD],
                  });
                }}
              >
                + Add Field
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
