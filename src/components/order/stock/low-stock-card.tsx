"use client";
import React from "react";
import Image from "next/image";
import { useLowStock } from "@/hooks/orders/stock.hooks";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { TrendingDown } from "lucide-react";

const LowStockCard: React.FC<{ threshold: number }> = ({ threshold }) => {
  const { data, isLoading, isError } = useLowStock();

  const lowStocks = data?.data.filter((s) => s.quantity < threshold) ?? [];

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>Không thể tải dữ liệu tồn kho thấp.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="border-red-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-red-700">
          <TrendingDown className="h-5 w-5" />
          Tồn kho thấp
        </CardTitle>
        <CardDescription>
          {lowStocks.length} sản phẩm dưới {threshold} đơn vị
        </CardDescription>
      </CardHeader>
      <CardContent>
        {lowStocks.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-500">
            Không có sản phẩm nào có tồn kho thấp
          </p>
        ) : (
          <>
            {lowStocks.slice(0, 5).map((s) => (
              <div
                key={s._id}
                className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50 p-3"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={s.medicine.thumbnail || "/placeholder.svg"}
                    alt={s.medicine?.name || "Ảnh thuốc"}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">{s.medicine.name}</p>
                    <p className="text-xs text-gray-500">{s.medicine.code}</p>
                  </div>
                </div>
                <Badge variant="destructive" className="font-bold">
                  {s.quantity}
                </Badge>
              </div>
            ))}
            {lowStocks.length > 5 && (
              <p className="pt-2 text-center text-xs text-gray-500">
                +{lowStocks.length - 5} sản phẩm khác
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
export default LowStockCard;
