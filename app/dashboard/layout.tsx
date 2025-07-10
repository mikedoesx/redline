"use client";

import { DashboardSidebar } from "@/lib/components/pages/dashboard/DashboardSidebar";
import type React from "react";
import { SidebarProvider } from "@/lib/components/ui/sidebar";
import { auth } from "@/lib/services/firebase";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/login");
    }
  }, [router]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </SidebarProvider>
  );
}
