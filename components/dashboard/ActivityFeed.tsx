import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, MapPin, AlertTriangle, CheckCircle } from "lucide-react"

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: "shift_start",
      message: "John Smith started shift at Building A",
      time: "2 minutes ago",
      icon: Clock,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "location_update",
      message: "Sarah Johnson updated location to Zone 3",
      time: "5 minutes ago",
      icon: MapPin,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "alert",
      message: "Temperature alert triggered in Building B",
      time: "12 minutes ago",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      id: 4,
      type: "task_complete",
      message: "Mike Davis completed safety inspection",
      time: "18 minutes ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 5,
      type: "shift_end",
      message: "Lisa Brown ended shift at Building C",
      time: "25 minutes ago",
      icon: Clock,
      color: "text-gray-600",
    },
    {
      id: 6,
      type: "alert",
      message: "Equipment maintenance required in Zone 1",
      time: "32 minutes ago",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
  ]

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px]">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
