"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/lib/components/ui/avatar";
import {
  Bell,
  BookOpen,
  Calendar,
  CalendarIcon,
  CheckSquare,
  Clock,
  FileText,
  GraduationCap,
  HelpCircle,
  LayoutDashboardIcon,
  LogOut,
  LucideProps,
  MessageCircle,
  User,
  User2Icon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";
import { ForwardRefExoticComponent, RefAttributes, useMemo } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/lib/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";

import { AuthService } from "@/lib/services/auth";
import { Badge } from "@/lib/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useUserProfile } from "@/lib/hooks/use-user-profile";

interface NavItem {
  title?: string;
  url?: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  active?: boolean;
  badge?: boolean;
  items?: NavItem[];
}

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { profile, getDisplayUserType } = useUserProfile();
  const authService = AuthService.getInstance();

  const navigationItems: NavItem[] = useMemo(
    () => [
      {
        items: [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboardIcon,
            active: pathname === "/dashboard",
            badge: false,
          },
          {
            title: "Profile",
            url: "/profile",
            icon: User2Icon,
            active: pathname === "/profile",
            badge: !profile?.isComplete,
          },
        ],
      },
      {
        title: "Operations",
        items: [
          {
            title: "Time Clock",
            url: "/time-clock",
            icon: Clock,
            active: pathname.includes("/time-clock"),
            badge: false,
          },
          {
            title: "Scheduling",
            url: "/scheduling",
            icon: Calendar,
            active: pathname === "/scheduling",
            badge: false,
          },
          {
            title: "Quick Tasks",
            url: "/quick-tasks",
            icon: CheckSquare,
            active: pathname === "/quick-tasks",
            badge: false,
          },
        ],
      },
      {
        title: "Communication",
        items: [
          {
            title: "Chat",
            url: "/chat",
            icon: MessageCircle,
            active: pathname === "/chat",
            badge: false,
          },
          {
            title: "Updates",
            url: "/updates",
            icon: Bell,
            active: pathname === "/updates",
            badge: false,
          },
          {
            title: "Knowledge Base",
            url: "/knowledge-base",
            icon: BookOpen,
            active: pathname === "/knowledge-base",
            badge: false,
          },
          {
            title: "Help Desk",
            url: "/help-desk",
            icon: HelpCircle,
            active: pathname === "/help-desk",
            badge: false,
          },
        ],
      },
      {
        title: "HR & Skills",
        items: [
          {
            title: "Onboarding",
            url: "/onboarding",
            icon: CalendarIcon,
            active: pathname === "/onboarding",
            badge: false,
          },
          {
            title: "Training",
            url: "/training",
            icon: GraduationCap,
            active: pathname === "/dashboard/training",
            badge: false,
          },
          {
            title: "Documents",
            url: "/documents",
            icon: FileText,
            active: pathname === "/dashboard/documents",
            badge: false,
          },
        ],
      },
    ],
    [pathname],
  );

  const handleLogout = async () => {
    await authService.logout();
    router.push("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={pathname === "/dashboard"}
              isAlert={false}
              size="lg"
              onClick={() => router.push("/")}
            >
              <Image
                src="/images/logo220x48.png"
                alt="Redline"
                width={220}
                height={48}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navigationItems.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items?.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    {/* Render item with or without a URL */}
                    {item.url ? (
                      <SidebarMenuButton
                        asChild
                        isActive={item.active}
                        isAlert={item.badge}
                      >
                        <Link
                          href={item.url}
                          className="sidebar-link flex justify-between items-center"
                        >
                          <div className="flex items-center gap-2">
                            {item.icon && <item.icon className="h-4 w-4" />}
                            <span className={item.active ? "font-bold" : ""}>
                              {item.title}
                            </span>
                          </div>
                          {item.badge && profile?.overallStatus && (
                            <Badge className="capitalize rounded-full bg-destructive">
                              {profile?.overallStatus}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    ) : (
                      <div className="flex flex-col gap-1 ml-1">
                        <div className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium">
                          <span>{item.title}</span>
                        </div>
                        {item.items && item.items?.length > 0 && (
                          <SidebarMenu className="ml-4">
                            {item.items.map((subItem, subIndex) => (
                              <SidebarMenuItem key={subIndex}>
                                <SidebarMenuButton
                                  asChild
                                  isActive={subItem.active}
                                  isAlert={subItem.badge}
                                >
                                  <Link
                                    href={subItem.url ?? "#"}
                                    className="sidebar-link flex justify-between items-center text-sm"
                                  >
                                    <div className="flex items-center gap-2">
                                      {subItem.icon && (
                                        <subItem.icon className="h-4 w-4" />
                                      )}
                                      <span
                                        className={
                                          subItem.active ? "font-bold" : ""
                                        }
                                      >
                                        {subItem.title}
                                      </span>
                                    </div>
                                    {subItem.badge &&
                                      profile?.overallStatus && (
                                        <Badge className="capitalize rounded-full bg-destructive">
                                          {profile?.overallStatus}
                                        </Badge>
                                      )}
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            ))}
                          </SidebarMenu>
                        )}
                      </div>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  isActive={false}
                  isAlert={false}
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={profile?.imageUrl} alt="User" />
                    <AvatarFallback className="rounded-lg">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {profile?.firstName} - {getDisplayUserType}
                    </span>
                    <span className="truncate text-xs">{profile?.email}</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
