"use client";
import React from "react";
import Image from "next/image";
import { IStock } from "@/interface/order/stock.interface";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import { Eye, Edit } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface StockTableProps {
  stocks: IStock[];
  currentPage: number;
  itemsPerPage: number;
}

const StockTable: React.FC<StockTableProps> = ({ stocks, currentPage, itemsPerPage }) => {
  const router = useRouter();
  const start = (currentPage - 1) * itemsPerPage;
  const visible = stocks.slice(start, start + itemsPerPage);

  const fmtPrice = (v: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(v);
  const fmtDate = (d: Date | string) =>
    new Intl.DateTimeFormat("vi-VN").format(new Date(d));

  const isSoon = (d?: Date | string) => {
    if (!d) return false;
    const diff = (new Date(d).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff < 60;
  };
  const isLow = (q: number) => q < 10;

  const handleViewDetails = (e: React.MouseEvent, medicineId: string) => {
    e.stopPropagation();
    router.push(`/stock/${medicineId}`);
    toast.info("Xem chi tiết");
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info("Chỉnh sửa");
  };

  const handleRowClick = (medicineId: string) => {
    router.push(`/stock/${medicineId}`);
  };

  return (
    <div className="space-y-4">
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              {["Thuốc", "Đóng gói", "Số lượng", "Giá bán", "Cập nhật", ""].map(
                (h) => (
                  <th
                    key={h}
                    className={`px-6 py-3 text-xs font-medium uppercase tracking-wider ${
                      h === ""
                        ? "text-right text-gray-500"
                        : "text-left text-gray-500"
                    }`}
                  >
                    {h}
                  </th>
                )
              )}
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {visible.map((s) => (
                <tr
                  key={s._id}
                  className={`group cursor-pointer hover:bg-gray-50 ${
                    isLow(s.quantity) ? "bg-red-50" : ""
                  }`}
                  onClick={() => handleRowClick(s.medicine._id)}
                >
                  {/* Thuốc + meta */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Image
                        src={s.medicine.thumbnail || "/placeholder.svg"}
                        alt={s.medicine?.name || "Ảnh thuốc"}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">
                            {s.medicine.name}
                          </span>
                          {isSoon(s.expiryDate) && (
                            <Badge variant="destructive" className="text-xs">
                              Sắp hết hạn
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {s.medicine.code} • {s.medicine.dosageForm}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm">{s.packaging}</td>

                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-medium ${
                        isLow(s.quantity) ? "text-red-600" : ""
                      }`}
                    >
                      {s.quantity}
                    </span>
                    {isLow(s.quantity) && (
                      <AlertTriangle className="ml-1 inline h-4 w-4 text-red-500" />
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    {fmtPrice(s.sellingPrice)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {fmtDate(s.updatedAt)}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => handleViewDetails(e, s.medicine._id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={handleEdit}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4">
        {visible.map((s) => (
          <Card
            key={s._id}
            className={`cursor-pointer hover:shadow-md ${
              isLow(s.quantity) ? "border-red-200 bg-red-50" : ""
            }`}
            onClick={() => handleRowClick(s.medicine._id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <Image
                    src={
                      s.medicine.thumbnail ||
                      "/placeholder.svg?height=48&width=48"
                    }
                    alt={s.medicine.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="truncate text-sm font-medium">
                        {s.medicine.name}
                      </h3>
                      {isSoon(s.expiryDate) && (
                        <Badge variant="destructive" className="text-xs">
                          Sắp hết hạn
                        </Badge>
                      )}
                    </div>
                    <p className="mb-2 text-xs text-gray-500">
                      {s.medicine.code} • {s.medicine.dosageForm}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <span className="text-gray-500">
                        Đóng gói:{" "}
                        <span className="font-medium">{s.packaging}</span>
                      </span>
                      <span className="text-gray-500">
                        Giá:{" "}
                        <span className="font-medium">
                          {fmtPrice(s.sellingPrice)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span
                    className={`text-sm font-bold ${
                      isLow(s.quantity) ? "text-red-600" : ""
                    }`}
                  >
                    {s.quantity}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => handleViewDetails(e, s.medicine._id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleEdit}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StockTable;