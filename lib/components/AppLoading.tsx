"use client";

import { Loader2 } from "lucide-react";

export const PageLoading = ({ page }: { page: string }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-2 text-muted-primary">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading {page}...</span>
      </div>
    </div>
  );
};
