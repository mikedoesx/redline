"use client";

import { Badge, StatusBadge } from "@/lib/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/lib/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import { useEffect, useState } from "react";

import { Button } from "@/lib/components/ui/button";
import { ChevronDown } from "lucide-react";
import { DateFormatters } from "@/lib/utils";
import { Input } from "@/lib/components/ui/input";
import { PageLoading } from "@/lib/components/pages/PageLoading";
import { UserTypeOptions } from "@/lib/constants/form-options";
import { templateStatusColorMap } from "@/lib/constants/form-steps";
import { useProfileCheck } from "@/lib/hooks/use-profile-check";
import { useRouter } from "next/navigation";

const STATUS_OPTIONS = ["all", "draft", "active", "archived"] as const;

type FormTemplate = {
  id: string;
  name: string;
  description: string;
  status: "draft" | "active" | "archived";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, isCheckingProfile } = useProfileCheck();

  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUS_OPTIONS)[number]>("all");
  const [search, setSearch] = useState("");
  const [templates, setTemplates] = useState<FormTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);

  useEffect(() => {
    if (isCheckingProfile || !profile) return;

    if (profile.isComplete && profile.userType === UserTypeOptions.FIRE_WATCH) {
      router.replace("/profile");
    }
  }, [profile, isCheckingProfile, router]);

  useEffect(() => {
    if (!profile) return;

    setLoadingTemplates(true);

    // 🔧 Placeholder for loading templates from Firestore
    setTimeout(() => {
      setTemplates([
        {
          id: "default-onboarding",
          name: "Default Onboarding",
          description: "Standard flow for new users",
          status: "active",
          createdBy: "admin@example.com",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "archived-example",
          name: "Old Admin Template",
          description: "Deprecated version",
          status: "archived",
          createdBy: "admin@example.com",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
      setLoadingTemplates(false);
    }, 750);
  }, [profile]);

  const filteredTemplates = templates.filter((t) => {
    return (
      (statusFilter === "all" || t.status === statusFilter) &&
      (t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()))
    );
  });

  if (loadingTemplates || isCheckingProfile || !profile) {
    return <PageLoading page="Onboarding" />;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-6 flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold">Onboarding Templates</h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-xl">
            View, create, and manage onboarding form templates. Templates define
            the steps new users will complete when joining your platform.
          </p>
        </div>
        <Button onClick={() => router.push("/dashboard/onboarding/new")}>
          + New Template
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-4 flex-wrap">
            <Input
              type="text"
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />

            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Status: {statusFilter}{" "}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {STATUS_OPTIONS.map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => setStatusFilter(status)}
                    >
                      {status}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Sort by: Newest <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Newest</DropdownMenuItem>
                  <DropdownMenuItem>Oldest</DropdownMenuItem>
                  <DropdownMenuItem>Name A-Z</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{template.description}</TableCell>
                  <TableCell className="capitalize text-muted-foreground">
                    <StatusBadge status={template.status} />
                  </TableCell>
                  <TableCell>{template.createdBy}</TableCell>
                  <TableCell>
                    {DateFormatters.format(
                      new Date(template.updatedAt),
                      DateFormatters.dateTime,
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        router.push(`/dashboard/onboarding/${template.id}`)
                      }
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
