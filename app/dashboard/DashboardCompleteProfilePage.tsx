"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card";

import Link from "next/link";
import { TriangleAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardCompleteProfilePage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <Card>
        <CardHeader className="text-center">
          <TriangleAlertIcon className="h-10 w-10 mx-auto text-yellow-500" />
          <CardTitle>Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center text-center space-y-4">
            <p className="text-gray-600">
              To access your dashboard and start managing fire watch tasks,
              please complete your profile.
            </p>
            <Link href="/profile">Go to Profile</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
