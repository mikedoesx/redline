"use client";

import { SidebarInset, SidebarProvider } from "@/lib/components/ui/sidebar";

import { DashboardHeader } from "@/lib/components/pages/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/lib/components/pages/dashboard/DashboardSidebar";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useProfileCheck } from "@/lib/hooks/use-profile-check";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCheckingProfile, hasCompleteProfile } = useProfileCheck();

  if (isCheckingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (!hasCompleteProfile) {
    return null; // useProfileCheck will handle redirect
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex flex-1 flex-col gap-4">{children}</div>
    </SidebarProvider>
  );
}
