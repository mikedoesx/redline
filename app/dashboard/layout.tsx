"use client";

import { SidebarInset, SidebarProvider } from "@/lib/components/ui/sidebar";

import { DashboardHeader } from "@/lib/components/pages/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/lib/components/pages/dashboard/DashboardSidebar";
import { PageLoading } from "@/lib/components/pages/PageLoading";
import type React from "react";
import { useProfileCheck } from "@/lib/hooks/use-profile-check";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCheckingProfile, hasCompleteProfile } = useProfileCheck();

  if (isCheckingProfile) {
    return <PageLoading page={"Dashboard"} />;
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
