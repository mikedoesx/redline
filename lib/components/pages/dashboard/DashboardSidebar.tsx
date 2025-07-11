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
  LogOut,
  MessageCircle,
  User,
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
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/lib/components/ui/sidebar";

import { AuthService } from "@/lib/services/auth";
import Image from "next/image";
import { useAuth } from "@/lib/providers/auth-context";
import { useRouter } from "next/navigation";

const navigationItems = [
  {
    title: "Operations",
    items: [
      {
        title: "Time Clock",
        url: "/dashboard/time-clock",
        icon: Clock,
      },
      {
        title: "Scheduling",
        url: "/dashboard/scheduling",
        icon: Calendar,
      },
      {
        title: "Quick Tasks",
        url: "/dashboard/quick-tasks",
        icon: CheckSquare,
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
      },
      {
        title: "Updates",
        url: "/dashboard/updates",
        icon: Bell,
      },
      {
        title: "Knowledge Base",
        url: "/dashboard/knowledge-base",
        icon: BookOpen,
      },
      {
        title: "Help Desk",
        url: "/dashboard/help-desk",
        icon: HelpCircle,
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
      },
      {
        title: "Onboarding",
        url: "/dashboard/onboarding",
        icon: CalendarIcon,
      },
      {
        title: "Training",
        url: "/dashboard/training",
        icon: GraduationCap,
      },
      {
        title: "Documents",
        url: "/dashboard/documents",
        icon: FileText,
      },
    ],
  },
];

export function DashboardSidebar() {
  const router = useRouter();
  const authService = AuthService.getInstance();
  const user = useAuth();

  const handleLogout = async () => {
    await authService.logout();
    router.push("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={() => router.push("/")}>
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
        {navigationItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
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
                      Fire Watch User
                    </span>
                    <span className="truncate text-xs">{user.user?.email}</span>
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
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
