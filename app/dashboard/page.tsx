"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button, Flex, Separator } from "@radix-ui/themes";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { LaborChart } from "@/components/dashboard/LaborChart";
import { MapView } from "@/components/dashboard/MapView";
import { QuickTasks } from "@/components/dashboard/QuickTasks";
import { StatCards } from "@/components/dashboard/StatCards";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const logout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Flex justify="between" align="center" className="w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Button onClick={() => logout()}>Sign out</Button>
        </Flex>
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
  );
}
