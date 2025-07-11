"use client";

import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { Check, Clock, AlertCircle, Eye } from "lucide-react";
import {
  getStepStatusLabel,
  getStepStatusColor,
  type StepStatus,
} from "@/lib/form-validators/form-steps";

interface ProfileProgressHeaderProps {
  currentStepIndex: number;
  totalSteps: number;
  progress: number;
  stepStatuses?: Record<string, StepStatus>;
  stepIds?: string[];
}

export const ProfileProgressHeader = ({
  currentStepIndex,
  totalSteps,
  progress,
  stepStatuses = {},
  stepIds = [],
}: ProfileProgressHeaderProps) => {
  const getStatusIcon = (status: StepStatus) => {
    switch (status) {
      case "complete":
      case "approved":
        return <Check className="h-3 w-3" />;
      case "pending":
        return <Clock className="h-3 w-3" />;
      case "under-review":
        return <Eye className="h-3 w-3" />;
      case "needs-rework":
        return <AlertCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Profile Setup</h1>
        <div className="text-sm text-muted-foreground">
          Step {currentStepIndex + 1} of {totalSteps}
        </div>
      </div>

      <Progress value={progress} className="mb-4" />

      {/* Step Status Overview */}
      {stepIds.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {stepIds.map((stepId, index) => {
            const status = stepStatuses[stepId] || "draft";

            return (
              <Badge
                key={stepId}
                variant={"outline"}
                className={`flex items-center space-x-1`}
              >
                {getStatusIcon(status)}
                <span className={`text-xs ${getStepStatusColor(status)}`}>
                  Step {index + 1}: {getStepStatusLabel(status)}
                </span>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};
