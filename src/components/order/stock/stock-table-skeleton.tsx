"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
const StockTableSkeleton: React.FC = () => (
  <div className="space-y-4">
    {/* Desktop skeleton */}
    <div className="hidden md:block">
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="bg-gray-50 px-6 py-3">
          <div className="flex justify-between">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </div>
        </div>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="divide-y divide-gray-200 px-6 py-4">
            <Skeleton className="h-6 w-full" />
          </div>
        ))}
      </div>
    </div>

    {/* Mobile skeleton */}
    <div className="space-y-4 md:hidden">
      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4 space-y-3">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-56" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
export default StockTableSkeleton;
