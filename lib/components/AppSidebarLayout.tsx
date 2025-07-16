"use client";

import { SidebarInset, SidebarProvider } from "@/lib/components/ui/sidebar";

import { AppFooter } from "./AppFooter";
import { AppSidebar } from "@/lib/components/AppSidebar";
import { AppSidebarHeader } from "@/lib/components/AppSidebarHeader";
import { PageLoading } from "@/lib/components/AppLoading";
import type React from "react";
import { useAppUser } from "@/lib/hooks/use-user-profile";

export default function AppSidebarLayout({
  children,
  page,
}: {
  page: string;
  children: React.ReactNode;
}) {
  const { isCheckingProfile } = useAppUser();

  if (isCheckingProfile) {
    return <PageLoading page={page} />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppSidebarHeader />
        <div className="container mx-auto px-4 py-8">{children}</div>
        <AppFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
