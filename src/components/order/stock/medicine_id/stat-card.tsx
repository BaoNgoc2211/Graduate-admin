// export const StatCard: React.FC<{ label: string; value: React.ReactNode; icon: React.ReactElement; valueClass?: string }> = ({ label, value, valueClass }) => (
//   <Card>
//     <CardContent className="p-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-600">{label}</p>
//           <p className={`text-2xl font-bold ${valueClass ?? "text-gray-900"}`}>{value}</p>
//         </div>
//       </div>
//     </CardContent>
//   </Card>
// );
// src/components/stock/stat-card.tsx
"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const StatCard: React.FC<{
  label: string;
  value: React.ReactNode;
  icon: React.ReactElement;
  valueClass?: string;
}> = ({ label, value, icon, valueClass }) => (
  // <Card >
  //   <CardContent className="p-6">
  //     <div className="flex items-center justify-between">
  //       <div>
  //         <p className="text-sm text-gray-600">{label}</p>
  //         <p className={`text-2xl font-bold ${valueClass ?? "text-gray-900"}`}>
  //           {value}
  //         </p>
  //       </div>
  //       <div>{icon}</div>
  //     </div>
  //   </CardContent>
  // </Card>
  <Card className="min-w-0">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <p className="text-sm text-gray-600 truncate">{label}</p>
          <p
            className={`text-2xl font-bold truncate ${
              valueClass ?? "text-gray-900"
            }`}
          >
            {value}
          </p>
        </div>
        <div className="shrink-0 ml-4">{icon}</div>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
