import AppSidebarLayout from "@/lib/components/AppSidebarLayout";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <AppSidebarLayout page="Dashbpard">{children}</AppSidebarLayout>;
}
