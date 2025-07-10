"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../../ui/breadcrumb";
import { Button, Flex, Separator } from "@radix-ui/themes";
import { CogIcon, LogOutIcon } from "lucide-react";

import { AuthService } from "@/lib/services/auth";
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
      <Flex justify="between" align="center" className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Flex gap="4" align="center">
          <Button variant="ghost" onClick={() => router.push("/settings")}>
            <CogIcon />
          </Button>

          <Button onClick={() => logout()}>
            <LogOutIcon size={16} />
            Sign out
          </Button>
        </Flex>
      </Flex>
    </header>
  );
};
