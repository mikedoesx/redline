"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import {
  CopyPlusIcon,
  FileText,
  ListChecks,
  SaveIcon,
  Trash2,
  XIcon,
} from "lucide-react";
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
} from "@/lib/components/ui/select";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { Switch } from "@/lib/components/ui/switch";
import { Textarea } from "@/lib/components/ui/textarea";

export default function EditStepPage() {
  const { id: templateId, stepId } = useParams();
  const router = useRouter();

  const [formState, setFormState] = useState<FormStep>(INITIAL_FORM_STEP);

  useEffect(() => {
    setTimeout(() => {
      setFormState({
        ...INITIAL_FORM_STEP,
        id: stepId as string,
        title: "Example Step",
        description: "This is a placeholder step",
        order: 1,
        requiresReview: false,
        dependencies: [],
        fields: [],
      });
    }, 300);
  }, [templateId, stepId]);

  const handleSaveStep = () => {
    console.log("Saving step:", formState);
    router.back();
  };

  const handleDuplicateStep = () => {
    console.log("Copying step:", formState);
    router.back();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ListChecks className="h-6 w-6" /> Edit Step
        </h1>
        <p className="text-muted-foreground text-sm">
          Modify the structure and metadata of a single step in this onboarding
          flow.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5" /> Step Metadata
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Title</Label>
                <Input
                  value={formState.title}
                  onChange={(e) =>
                    setFormState({ ...formState, title: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  value={formState.description}
                  onChange={(e) =>
                    setFormState({ ...formState, description: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Order</Label>
                <Input
                  type="number"
                  value={formState.order}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      order: parseInt(e.target.value, 10) || 0,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Dependencies (comma-separated step IDs)</Label>
                <Input
                  placeholder="step-1,step-2"
                  value={formState.dependencies.join(",")}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      dependencies: e.target.value
                        .split(",")
                        .map((d) => d.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Requires Admin Review</Label>
                <Switch
                  checked={formState.requiresReview}
                  onCheckedChange={(val) =>
                    setFormState({ ...formState, requiresReview: val })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecks className="h-5 w-5" /> Form Fields
            </CardTitle>
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
                        updated[index].type = value;
                        updated[index].options = [
                          "select",
                          "multiselect",
                          "radio",
                          "checkbox",
                        ].includes(value)
                          ? [{ label: "Option 1", value: "option1" }]
                          : [];
                        setFormState({ ...formState, fields: updated });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(FormFieldType).map((type) => (
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
                        {field.options?.map((opt, optIndex) => (
                          <div
                            key={optIndex}
                            className="flex items-center gap-2"
                          >
                            <Input
                              value={opt.label}
                              onChange={(e) => {
                                const updated = [...formState.fields];
                                updated[index].options![optIndex].label =
                                  e.target.value;
                                setFormState({ ...formState, fields: updated });
                              }}
                            />
                            <Input
                              value={opt.value}
                              onChange={(e) => {
                                const updated = [...formState.fields];
                                updated[index].options![optIndex].value =
                                  e.target.value;
                                setFormState({ ...formState, fields: updated });
                              }}
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                const updated = [...formState.fields];
                                updated[index].options!.splice(optIndex, 1);
                                setFormState({ ...formState, fields: updated });
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

                  <div className="bg-muted px-3 py-2 rounded text-sm text-muted-foreground">
                    <strong>{field.label}</strong> — {field.type}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const updated = [...formState.fields];
                        updated.splice(index, 1);
                        setFormState({ ...formState, fields: updated });
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))
            )}

            <div className="flex justify-end">
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
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>

          <div className="flex justify-end gap-2">
            <Button onClick={handleDuplicateStep} variant={"outline"}>
              <CopyPlusIcon /> Duplicate
            </Button>
            <Button onClick={handleSaveStep}>
              <SaveIcon /> Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
