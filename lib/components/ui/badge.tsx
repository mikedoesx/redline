import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type StatusType =
  | "draft"
  | "active"
  | "archived"
  | "pending"
  | "under-review"
  | "approved"
  | "needs-rework"
  | "complete";

const statusStyleMap: Record<StatusType, string> = {
  draft: "bg-gray-100 text-gray-800",
  active: "bg-green-100 text-green-800",
  archived: "bg-muted text-muted-foreground",
  pending: "bg-yellow-100 text-yellow-800",
  "under-review": "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  "needs-rework": "bg-red-100 text-red-800",
  complete: "bg-emerald-100 text-emerald-800",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const normalized = status.toLowerCase() as StatusType;
  const style = statusStyleMap[normalized] || "bg-muted text-muted-foreground";
  const label = status.replace(/-/g, " ");

  return <Badge className={`${style} ${className}`}>{label}</Badge>;
}

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-white",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-white",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants, StatusBadge };
