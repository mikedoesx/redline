import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { StatCards } from "@/components/dashboard/StatCards"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { LaborChart } from "@/components/dashboard/LaborChart"
import { MapView } from "@/components/dashboard/MapView"
import { QuickTasks } from "@/components/dashboard/QuickTasks"

export default function DashboardPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Stat Cards Row */}
        <StatCards />

        {/* Main Content Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>

          {/* Labor Chart */}
          <div className="lg:col-span-2">
            <LaborChart />
          </div>

          {/* Map View */}
          <div className="lg:col-span-2">
            <MapView />
          </div>

          {/* Quick Tasks */}
          <div className="lg:col-span-1">
            <QuickTasks />
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}
