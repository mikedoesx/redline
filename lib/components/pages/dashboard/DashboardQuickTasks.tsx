import { AlertTriangle, CheckSquare, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";

import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@radix-ui/themes";

export function DashboardQuickTasks() {
  const tasks = [
    {
      id: 1,
      title: "Complete safety inspection",
      description: "Building A - Zone 1",
      priority: "high",
      dueTime: "2:00 PM",
      type: "inspection",
    },
    {
      id: 2,
      title: "Equipment check",
      description: "Fire extinguisher maintenance",
      priority: "medium",
      dueTime: "4:30 PM",
      type: "maintenance",
    },
    {
      id: 3,
      title: "Submit hourly report",
      description: "Zone 3 patrol report",
      priority: "low",
      dueTime: "5:00 PM",
      type: "report",
    },
    {
      id: 4,
      title: "Temperature monitoring",
      description: "Check all sensors in Building B",
      priority: "high",
      dueTime: "6:00 PM",
      type: "monitoring",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="h-3 w-3" />;
      case "medium":
        return <Clock className="h-3 w-3" />;
      case "low":
        return <CheckSquare className="h-3 w-3" />;
      default:
        return <CheckSquare className="h-3 w-3" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckSquare className="h-5 w-5" />
          Your Quick Tasks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="p-3 border rounded-lg space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{task.title}</h4>
                  <p className="text-xs text-gray-600">{task.description}</p>
                </div>
                <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                  <span className="flex items-center gap-1">
                    {getPriorityIcon(task.priority)}
                    {task.priority}
                  </span>
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Due: {task.dueTime}
                </span>
                <Button
                  variant="outline"
                  className="text-xs h-6 bg-transparent"
                >
                  Complete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
