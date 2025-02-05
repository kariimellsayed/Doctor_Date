import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const SkeletonCard = () => {
  return (
    <Card className="w-full p-6 shadow-lg border rounded-xl animate-pulse bg-white">
      <CardContent className="flex flex-col gap-4">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>

        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>

        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </CardContent>
    </Card>
  );
};

export default SkeletonCard;
