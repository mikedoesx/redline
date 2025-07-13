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
import { Badge } from "../../ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useProfileCheck } from "@/lib/hooks/use-profile-check";

export function DashboardSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  console.log("🔥 - :54 - DashboardSidebar - pathname:", pathname);
  const { profile, getDisplayUserType } = useProfileCheck();
  const authService = AuthService.getInstance();

  const navigationItems = useMemo(
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
            url: "/dashboard/time-clock",
            icon: Clock,
            active: pathname === "/dashboard/time-clock",
            badge: false,
          },
          {
            title: "Scheduling",
            url: "/dashboard/scheduling",
            icon: Calendar,
            active: pathname === "/dashboard/scheduling",
            badge: false,
          },
          {
            title: "Quick Tasks",
            url: "/dashboard/quick-tasks",
            icon: CheckSquare,
            active: pathname === "/dashboard/quick-tasks",
            badge: false,
          },
        ],
      },
      {
        title: "Communication",
        items: [
          {
            title: "Chat",
            url: "/dashboard/chat",
            icon: MessageCircle,
            active: pathname === "/dashboard/chat",
            badge: false,
          },
          {
            title: "Updates",
            url: "/dashboard/updates",
            icon: Bell,
            active: pathname === "/dashboard/updates",
            badge: false,
          },
          {
            title: "Knowledge Base",
            url: "/dashboard/knowledge-base",
            icon: BookOpen,
            active: pathname === "/dashboard/knowledge-base",
            badge: false,
          },
          {
            title: "Help Desk",
            url: "/dashboard/help-desk",
            icon: HelpCircle,
            active: pathname === "/dashboard/help-desk",
            badge: false,
          },
        ],
      },
      {
        title: "HR & Skills",
        items: [
          {
            title: "Time Off",
            url: "/dashboard/time-off",
            icon: CalendarIcon,
            active: pathname === "/dashboard/time-off",
            badge: false,
          },
          {
            title: "Onboarding",
            url: "/dashboard/onboarding",
            icon: CalendarIcon,
            active: pathname === "/dashboard/onboarding",
            badge: false,
          },
          {
            title: "Training",
            url: "/dashboard/training",
            icon: GraduationCap,
            active: pathname === "/dashboard/training",
            badge: false,
          },
          {
            title: "Documents",
            url: "/dashboard/documents",
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
                {group.items.map((item, index) => (
                  <SidebarMenuItem key={index}>
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
                          <item.icon className="h-4 w-4" />
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
                    <AvatarImage
                      src="/images/placeholder-user.jpg"
                      alt="User"
                    />
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
