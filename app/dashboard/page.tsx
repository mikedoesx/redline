import { Box, Flex, Grid } from "@radix-ui/themes";

import { DashboardActivityFeed } from "@/lib/components/pages/dashboard/DashboardActivityFeed";
import { DashboardHeader } from "@/lib/components/pages/dashboard/DashboardHeader";
import { DashboardLaborChart } from "@/lib/components/pages/dashboard/DashboardLaborChart";
import { DashboardMapView } from "@/lib/components/pages/dashboard/DashboardMapView";
import { DashboardQuickTasks } from "@/lib/components/pages/dashboard/DashboardQuickTasks";
import { Metadata } from "next";
import { SidebarInset } from "@/lib/components/ui/sidebar";
import { StatCards } from "@/lib/components/pages/dashboard/DashboardStatCards";

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

export default function DashboardPage() {
  return (
    <SidebarInset>
      <DashboardHeader />
      <main>
        <Flex flexBasis="1" direction="column" gap="4" p="4">
          <StatCards />

          <Grid gap="4" columns={{ md: "2", lg: "3" }}>
            <Box className="lg:col-span-1">
              <DashboardActivityFeed />
            </Box>

            <Box className="lg:col-span-2">
              <DashboardLaborChart />
            </Box>

            <Box className="lg:col-span-2">
              <DashboardMapView />
            </Box>

            <Box className="lg:col-span-1">
              <DashboardQuickTasks />
            </Box>
          </Grid>
        </Flex>
      </main>
    </SidebarInset>
  );
}
