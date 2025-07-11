import { Progress } from "@/lib/components/ui/progress"

interface SettingsProgressHeaderProps {
  currentStepIndex: number
  totalSteps: number
  progress: number
}

export const SettingsProgressHeader = ({ currentStepIndex, totalSteps, progress }: SettingsProgressHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Profile Setup</h1>
        <span className="text-sm text-muted-foreground">
          Step {currentStepIndex + 1} of {totalSteps}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
