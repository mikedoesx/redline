import { Box, Flex, Grid } from "@radix-ui/themes";

import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { LaborChart } from "@/components/dashboard/LaborChart";
import { MapView } from "@/components/dashboard/MapView";
import { QuickTasks } from "@/components/dashboard/QuickTasks";
import { SidebarInset } from "@/components/ui/sidebar";
import { StatCards } from "@/components/dashboard/StatCards";

export default function DashboardPage() {
  return (
    <SidebarInset>
      <DashboardHeader />
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
    </SidebarInset>
  );
}
