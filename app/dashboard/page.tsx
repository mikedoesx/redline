import { DashboardPage } from "./DashboardPage";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dashboard | REDLINE Fire Watch Staffing",
    description:
      "View and manage your fire watch staffing schedules, site reports, and compliance tasks with REDLINE's secure dashboard.",
    icons: {
      icon: "/images/favicon.ico",
      shortcut: "/images/favicon.png",
      apple: "/images/logo180.png",
    },
    openGraph: {
      title: "Dashboard | REDLINE Fire Watch Staffing",
      description:
        "Access your REDLINE dashboard to manage staffing, reports, and site safety.",
    },
  };
}

export default function Dashboard() {
  return <DashboardPage />;
}
