import React from "react";
import { IStock } from "@/interface/order/stock.interface";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Package, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface BatchTableProps {
  batches: IStock[];
}

const BatchTable: React.FC<BatchTableProps> = ({ batches }) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "—";
    try {
      return new Intl.DateTimeFormat("vi-VN").format(new Date(dateString));
    } catch {
      return "—";
    }
  };

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false;
    const diffDays =
      (new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays < 60;
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const getRowStatus = (stock: IStock) => {
    if (isExpired(stock.expiryDate)) return "expired";
    if (isExpiringSoon(stock.expiryDate)) return "expiring";
    if (stock.quantity <= 10) return "low-stock";
    return "normal";
  };

  const getStatusBadge = (stock: IStock) => {
    if (isExpired(stock.expiryDate)) {
      return <Badge variant="destructive">Hết hạn</Badge>;
    }
    if (isExpiringSoon(stock.expiryDate)) {
      return (
        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
          Sắp hết hạn
        </Badge>
      );
    }
    if (stock.quantity <= 10) {
      return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Tồn kho thấp</Badge>;
    }
    return null;
  };

  const handleViewBatch = (stockId: string) => {
    toast.info(`Xem chi tiết lô: ${stockId}`);
    // TODO: Implement view batch details
  };

  const handleEditBatch = (stockId: string) => {
    toast.info(`Chỉnh sửa lô: ${stockId}`);
    // TODO: Implement edit batch functionality
  };

  const getBatchName = (stock: IStock) => {
    return stock.batchNumber || `Lô ${stock._id.slice(-6)}`;
  };

  if (!batches || batches.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Không có lô hàng nào
        </h3>
        <p className="text-gray-500">
          Chưa có lô hàng nào được nhập cho thuốc này.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Lô hàng",
                  "Số lượng", 
                  "Giá bán",
                  "Hạn sử dụng",
                  "Ngày nhập",
                  "Trạng thái",
                  ""
                ].map((header) => (
                  <th
                    key={header}
                    className={`px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 ${
                      header === "" ? "text-right" : "text-left"
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {batches.map((batch) => {
                const status = getRowStatus(batch);
                return (
                  <tr
                    key={batch._id}
                    className={`group hover:bg-gray-50 transition-colors ${
                      status === "expired"
                        ? "bg-red-50"
                        : status === "expiring"
                        ? "bg-orange-50"
                        : status === "low-stock"
                        ? "bg-yellow-50"
                        : ""
                    }`}
                  >
                    {/* Batch Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {getBatchName(batch)}
                        </span>
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${
                        batch.quantity <= 10 ? "text-yellow-600" : "text-gray-900"
                      }`}>
                        {batch.quantity}
                      </span>
                    </td>

                    {/* Selling Price */}
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {formatPrice(batch.sellingPrice)}
                    </td>

                    {/* Expiry Date */}
                    <td className="px-6 py-4">
                      <span className={`text-sm ${
                        isExpired(batch.expiryDate) 
                          ? "text-red-600 font-medium" 
                          : isExpiringSoon(batch.expiryDate)
                          ? "text-orange-600 font-medium"
                          : "text-gray-900"
                      }`}>
                        {formatDate(batch.expiryDate)}
                      </span>
                    </td>

                    {/* Created Date */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(batch.createdAt)}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      {getStatusBadge(batch)}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleViewBatch(batch._id)}
                          title="Xem chi tiết lô"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => handleEditBatch(batch._id)}
                          title="Chỉnh sửa lô"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {batches.map((batch) => {
          const status = getRowStatus(batch);
          return (
            <Card
              key={batch._id}
              className={`rounded-xl shadow-sm border ${
                status === "expired"
                  ? "border-red-200 bg-red-50"
                  : status === "expiring"
                  ? "border-orange-200 bg-orange-50"
                  : status === "low-stock"
                  ? "border-yellow-200 bg-yellow-50"
                  : "bg-white"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium">
                      {getBatchName(batch)}
                    </h3>
                    {getStatusBadge(batch)}
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleViewBatch(batch._id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleEditBatch(batch._id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-500">Số lượng:</span>
                    <span className={`font-medium ${
                      batch.quantity <= 10 ? "text-yellow-600" : ""
                    }`}>
                      {batch.quantity}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-gray-500">Giá bán:</span>{" "}
                    <span className="font-medium">{formatPrice(batch.sellingPrice)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-500">HSD:</span>
                    <span className={`font-medium ${
                      isExpired(batch.expiryDate) 
                        ? "text-red-600" 
                        : isExpiringSoon(batch.expiryDate)
                        ? "text-orange-600"
                        : ""
                    }`}>
                      {formatDate(batch.expiryDate)}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-gray-500">Ngày nhập:</span>{" "}
                    <span className="font-medium">{formatDate(batch.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default BatchTable;