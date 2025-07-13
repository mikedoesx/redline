"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";

import { Separator } from "../../ui/separator";
import { SidebarTrigger } from "../../ui/sidebar";
import { StringFormatters } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const DashboardHeader = () => {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: { name: string; path: string }[] = [];
    let currentPath = "";

    paths.forEach((segment) => {
      currentPath += `/${segment}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ name, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <section className="w-full flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <BreadcrumbItem key={breadcrumb.path}>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbPage>
                    {StringFormatters.ellipisifyIfLongerThan(
                      breadcrumb.name,
                      16,
                    )}
                  </BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink href={breadcrumb.path}>
                      {StringFormatters.ellipisifyIfLongerThan(
                        breadcrumb.name,
                        16,
                      )}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </section>
    </header>
  );
};
