import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";
import { MapPin, Users } from "lucide-react";

import { Badge } from "@/lib/components/ui/badge";

export function MapView() {
  const watchers = [
    {
      id: 1,
      name: "John Smith",
      location: "Building A - Zone 1",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      location: "Building B - Zone 3",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Davis",
      location: "Building C - Zone 2",
      status: "break",
    },
    {
      id: 4,
      name: "Lisa Brown",
      location: "Building A - Zone 4",
      status: "active",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Current Watcher Locations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Map Placeholder */}
        <div className="bg-gray-100 rounded-lg h-[200px] flex items-center justify-center mb-4">
          <div className="text-center text-gray-500">
            <MapPin className="h-12 w-12 mx-auto mb-2" />
            <p>Interactive Map View</p>
            <p className="text-sm">
              Real-time watcher locations would appear here
            </p>
          </div>
        </div>

        {/* Watcher List */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Users className="h-4 w-4" />
            Active Watchers (
            {watchers.filter((w) => w.status === "active").length})
          </div>
          {watchers.map((watcher) => (
            <div
              key={watcher.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-sm">{watcher.name}</p>
                <p className="text-xs text-gray-600">{watcher.location}</p>
              </div>
              <Badge
                variant={watcher.status === "active" ? "default" : "secondary"}
              >
                {watcher.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
