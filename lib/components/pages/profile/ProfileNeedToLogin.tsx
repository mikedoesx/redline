"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

import { Button } from "../../ui/button";
import Link from "next/link";

export const ProfileNeedToLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Profile Setup Required</CardTitle>
          <CardDescription>
            You need to be logged in to set up your profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href="/signup">Create Account</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
