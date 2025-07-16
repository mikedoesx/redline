"use client";

import { DashboardActivityFeed } from "./DashboardActivityFeed";
import { DashboardCompleteProfilePage } from "./DashboardCompleteProfilePage";
import { DashboardLaborChart } from "./DashboardLaborChart";
import { DashboardMapView } from "./DashboardMapView";
import { DashboardQuickTasks } from "./DashboardQuickTasks";
import { StatCards } from "./DashboardStatCards";
import { useAppUser } from "@/lib/hooks/use-user-profile";

export const DashboardPage = () => {
  const { hasCompleteProfile } = useAppUser();

  if (!hasCompleteProfile) {
    return <DashboardCompleteProfilePage />;
  }

  return (
    <main>
      <section className="flex flex-col flex-1 gap-4 p-4">
        <StatCards />

        <section className="grid md:grid-cols-3 lg:grid-cols-3 gap-4">
          <aside className="lg:col-span-1">
            <DashboardActivityFeed />
          </aside>

          <aside className="lg:col-span-2">
            <DashboardLaborChart />
          </aside>

          <aside className="lg:col-span-2">
            <DashboardMapView />
          </aside>

          <aside className="lg:col-span-1">
            <DashboardQuickTasks />
          </aside>
        </section>
      </section>
    </main>
  );
};
