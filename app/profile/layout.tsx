"use client";

import { SidebarInset, SidebarProvider } from "@/lib/components/ui/sidebar";

import { DashboardHeader } from "@/lib/components/pages/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/lib/components/pages/dashboard/DashboardSidebar";
import { PageLoading } from "@/lib/components/pages/PageLoading";
import { useProfileCheck } from "@/lib/hooks/use-profile-check";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCheckingProfile } = useProfileCheck();

  if (isCheckingProfile) {
    return <PageLoading page="Profile" />;
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex flex-1 flex-col gap-4">
        <SidebarInset>
          <DashboardHeader />
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
