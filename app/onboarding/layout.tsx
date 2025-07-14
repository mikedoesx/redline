import AppSidebarLayout from "@/lib/components/AppSidebarLayout";
import { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AppSidebarLayout page="Onboarding">{children}</AppSidebarLayout>;
}
