import { Box, Flex, Grid } from "@radix-ui/themes";

import { ActivityFeed } from "@/lib/components/dashboard/ActivityFeed";
import { DashboardHeader } from "@/lib/components/dashboard/DashboardHeader";
import { LaborChart } from "@/lib/components/dashboard/LaborChart";
import { MapView } from "@/lib/components/dashboard/MapView";
import { Metadata } from "next";
import { QuickTasks } from "@/lib/components/dashboard/QuickTasks";
import { SidebarInset } from "@/lib/components/ui/sidebar";
import { StatCards } from "@/lib/components/dashboard/StatCards";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dashboard | REDLINE Fire Watch Staffing",
    description:
      "View and manage your fire watch staffing schedules, site reports, and compliance tasks with REDLINE's secure dashboard.",
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
              <ActivityFeed />
            </Box>

            <Box className="lg:col-span-2">
              <LaborChart />
            </Box>

            <Box className="lg:col-span-2">
              <MapView />
            </Box>

            <Box className="lg:col-span-1">
              <QuickTasks />
            </Box>
          </Grid>
        </Flex>
      </main>
    </SidebarInset>
  );
}
