import AppSidebarLayout from "@/lib/components/AppSidebarLayout";
import { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <AppSidebarLayout page="Profile">{children}</AppSidebarLayout>;
}
