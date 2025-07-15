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
  FileTextIcon,
  PlusIcon,
  SaveIcon,
  Send,
  SendIcon,
} from "lucide-react";
import {
  FormStep,
  StepStatus,
  TemplateStatus,
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
import { PageLoading } from "@/lib/components/AppLoading";
import { Textarea } from "@/lib/components/ui/textarea";
import { UserRole } from "@/lib/types/user-profile";
import { useUserProfile } from "@/lib/hooks/use-user-profile";

export const dynamic = "force-dynamic";

export default function OnboardingTemplateDetailPage() {
  const router = useRouter();
  const params = useParams();
  const templateId = params?.id as string;

  const { profile, isCheckingProfile, isComplete } = useUserProfile();
  const [loadingTemplate, setLoadingTemplate] = useState(true);

  const [template, setTemplate] = useState({
    id: templateId,
    name: "",
    description: "",
    status: "draft" as "draft" | "active" | "archived",
    steps: [] as FormStep[],
  });

  useEffect(() => {
    if (isCheckingProfile || !profile) return;

    if (profile && profile.userType === UserRole.FIRE_WATCH) {
      router.replace("/profile");
    }
  }, [profile, isCheckingProfile, router]);

  useEffect(() => {
    if (!profile || !templateId) return;

    setLoadingTemplate(true);

    // 🔧 Placeholder for fetching from Firestore
    setTimeout(() => {
      setTemplate({
        id: templateId,
        name: "Default Onboarding",
        description: "Standard flow for new users",
        status: "draft",
        steps: [], // 🔧 Hook up actual steps later
      });
      setLoadingTemplate(false);
    }, 750);
  }, [templateId, profile]);

  const handleSaveTemplate = () => {
    // 🔧 Save logic to Firestore
    console.log("Save", template);
  };

  const handleSubmitTemplate = () => {
    // 🔧 Submit logic to Firestore
    template.status = TemplateStatus.active;
    console.log("Submit", template);
  };

  const handleDuplicateTemplate = () => {
    // 🔧 Duplicate logic to Firestore
    console.log("Duplicate", template);
  };

  if (isCheckingProfile || !profile || loadingTemplate) {
    return <PageLoading page="Template Details" />;
  }

  return (
    <div className="p-8 mx-auto max-w-4xl">
      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6" /> Edit Template
        </h1>
        <p className="text-muted-foreground">
          Customize the structure and behavior of the selected onboarding
          template.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Template Metadata
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Update the name, description, and publication status of this
            onboarding template.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input
                value={template.name}
                onChange={(e) =>
                  setTemplate({ ...template, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                value={template.description}
                onChange={(e) =>
                  setTemplate({ ...template, description: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={template.status}
                onValueChange={(value) =>
                  setTemplate({ ...template, status: value as any })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="flex items-center gap-2">
              <FileTextIcon className="w-5 h-5" /> Form Steps
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage the individual steps that make up this onboarding flow. You
              can edit, delete, or add new steps below.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newId = `step-${Date.now()}`;
              router.push(`/onboarding/${templateId}/${newId}`);
            }}
          >
            <PlusIcon className="w-4 h-4 mr-1" /> Add Step
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {template.steps.length === 0 ? (
            <p className="text-sm text-muted-foreground">No steps added yet.</p>
          ) : (
            template.steps.map((step, stepIndex) => (
              <div
                key={step.id}
                className="border rounded-md p-4 space-y-4 bg-muted/20"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        router.push(`/onboarding/${templateId}/${step.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        const updated = [...template.steps];
                        updated.splice(stepIndex, 1);
                        setTemplate({ ...template, steps: updated });
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="pl-4 space-y-2">
                  {step.fields.length === 0 ? (
                    <p className="text-xs text-muted-foreground">No fields.</p>
                  ) : (
                    step.fields.map((field, fieldIndex) => (
                      <div
                        key={field.name}
                        className="flex justify-between text-sm py-1 border-b"
                      >
                        <span>
                          <strong>{field.label}</strong> ({field.type})
                        </span>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              const updated = [...template.steps];
                              updated[stepIndex].fields.splice(fieldIndex, 1);
                              setTemplate({ ...template, steps: updated });
                            }}
                          >
                            ✕
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>

        <div className="flex justify-end gap-2">
          <Button onClick={handleDuplicateTemplate} variant={"outline"}>
            <CopyPlusIcon /> Duplicate
          </Button>
          <Button onClick={handleSaveTemplate} variant={"outline"}>
            <SaveIcon /> Save
          </Button>
          <Button onClick={handleSubmitTemplate}>
            <SendIcon /> Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
