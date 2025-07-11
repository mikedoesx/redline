"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../../ui/breadcrumb";
import { LogOutIcon, User2 } from "lucide-react";

import { AuthService } from "@/lib/services/auth";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { SidebarTrigger } from "../../ui/sidebar";
import { useRouter } from "next/navigation";

export const DashboardHeader = () => {
  const router = useRouter();
  const authService = AuthService.getInstance();

  const logout = async () => {
    await authService.logout();
    router.push("/login");
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <section className="w-full flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex gap-4 items-center">
          <Button variant="outline" onClick={() => router.push("/profile")}>
            <User2 size={16} /> Profile
          </Button>

          <Button onClick={() => logout()}>
            <LogOutIcon size={16} />
            Sign out
          </Button>
        </div>
      </section>
    </header>
  );
};
