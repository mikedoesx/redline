"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Button, Flex, Separator } from "@radix-ui/themes";

import { SidebarTrigger } from "../ui/sidebar";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const DashboardHeader = () => {
  const router = useRouter();

  const logout = async () => {
    await signOut();
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

        <Button onClick={() => logout()}>Sign out</Button>
      </Flex>
    </header>
  );
};
