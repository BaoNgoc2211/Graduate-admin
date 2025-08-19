"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Package,
  Search,
  Check,
  X,
  Calendar,
  AlertTriangle,
  Info,
} from "lucide-react";
import { useImportBatch } from "@/hooks/orders/purchase.hooks";
import { useMedicines } from "@/hooks/medicine/medicine.hooks";
import { IStock } from "@/interface/order/stock.interface";
import { IImportBatch } from "@/interface/inventory/import-batch.interface";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import { toast } from "sonner";

interface BatchSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicineId?: string;
  currentStocks: IStock[];
  onSelectionChange?: (selectedBatchIds: string[]) => void;
  medicineData?: IMedicine; // Thêm prop để nhận dữ liệu thuốc hiện tại
}

const BatchSelectorModal: React.FC<BatchSelectorModalProps> = ({
  isOpen,
  onClose,
  medicineId,
  currentStocks,
  onSelectionChange,
  medicineData,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [pendingSelection, setPendingSelection] = useState<string[]>([]);

  const { data: batchData, isLoading } = useImportBatch();
  const { handleUpdate, isUpdating } = useMedicines();
  const availableBatches = batchData?.data || [];

  // Initialize selection with current stock batches
  useEffect(() => {
    if (currentStocks.length > 0) {
      const currentBatchIds = currentStocks
        .map((stock) =>
          typeof stock.importBatch === "string"
            ? stock.importBatch
            : stock.importBatch?._id
        )
        .filter(Boolean) as string[];

      setSelectedBatches(currentBatchIds);
      setPendingSelection(currentBatchIds);
    } else if (medicineData?.importBatch_id) {
      // Nếu không có currentStocks, sử dụng dữ liệu từ medicineData
      const currentBatchIds = medicineData.importBatch_id.map(batch => 
        typeof batch === "string" ? batch : batch._id
      ).filter(Boolean) as string[];
      
      setSelectedBatches(currentBatchIds);
      setPendingSelection(currentBatchIds);
    }
  }, [currentStocks, medicineData]);

  // Filter batches based on search
  const filteredBatches = availableBatches.filter((batch) => {
    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      batch.batchNumber?.toLowerCase().includes(searchLower) ||
      batch._id.toLowerCase().includes(searchLower)
    );
  });

  const toggleBatchSelection = (batchId: string) => {
    setPendingSelection((prev) => {
      if (prev.includes(batchId)) {
        return prev.filter((id) => id !== batchId);
      } else {
        return [...prev, batchId];
      }
    });
  };

  const handleSelectAll = () => {
    const allBatchIds = filteredBatches.map((batch) => batch._id);
    setPendingSelection(allBatchIds);
  };

  const handleDeselectAll = () => {
    setPendingSelection([]);
  };

  const handleApply = async () => {
    if (!medicineId || !medicineData) {
      toast.error("Thiếu thông tin thuốc để cập nhật!");
      return;
    }

    try {
      // Chuẩn bị dữ liệu cập nhật
      const updateData = {
        importBatch_id: pendingSelection,
      };

      // Gọi API cập nhật thuốc
      await handleUpdate(medicineId, updateData);
      
      // Cập nhật state local
      setSelectedBatches(pendingSelection);
      
      // Callback để parent component biết về thay đổi
      if (onSelectionChange) {
        onSelectionChange(pendingSelection);
      }

      toast.success(`Đã cập nhật ${pendingSelection.length} lô hàng cho thuốc`);
      onClose();
    } catch (error) {
      console.error("Error updating medicine batches:", error);
      toast.error("Có lỗi xảy ra khi cập nhật lô hàng!");
    }
  };

  const handleCancel = () => {
    setPendingSelection(selectedBatches); // Reset to original selection
    onClose();
  };

  const isExpiringSoon = (expiryDate?: Date): boolean => {
    if (!expiryDate) return false;
    const diffDays =
      (new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays <= 60;
  };

  const isExpired = (expiryDate?: Date): boolean => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const formatDate = (dateInput?: string | number | Date): string => {
    if (!dateInput) return "N/A";
    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) return "N/A";
      return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(date);
    } catch {
      return "N/A";
    }
  };

  const getBatchStatus = (batch: IImportBatch) => {
    if (isExpired(batch.expiryDate)) return "expired";
    if (isExpiringSoon(batch.expiryDate)) return "expiring";
    return "normal";
  };

  const getBatchStatusColor = (status: string) => {
    switch (status) {
      case "expired":
        return "border-red-200 bg-red-50";
      case "expiring":
        return "border-orange-200 bg-orange-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  const isCurrentlyInStock = (batchId: string): boolean => {
    return currentStocks.some(
      (stock) =>
        (typeof stock.importBatch === "string"
          ? stock.importBatch
          : stock.importBatch?._id) === batchId
    ) || (medicineData?.importBatch_id?.some(batch => 
      typeof batch === "string" ? batch === batchId : batch._id === batchId
    ) ?? false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Chọn lô hàng cho thuốc
          </DialogTitle>
          <DialogDescription>
            Chọn các lô hàng sẽ được gán cho thuốc &quot;{medicineData?.name}&quot;. 
            Hiện tại có {selectedBatches.length} lô đang được gán.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col space-y-4">
          {/* Search and Actions */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm theo mã lô..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                disabled={filteredBatches.length === 0}
              >
                Chọn tất cả
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeselectAll}
                disabled={pendingSelection.length === 0}
              >
                Bỏ chọn tất cả
              </Button>
            </div>
          </div>

          {/* Selection Summary */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Đã chọn: {pendingSelection.length} lô</span>
            <span>Tổng cộng: {filteredBatches.length} lô</span>
            {pendingSelection.length !== selectedBatches.length && (
              <Badge variant="secondary" className="text-orange-600">
                Có thay đổi chưa lưu
              </Badge>
            )}
          </div>

          {/* Batch List */}
          <div className="flex-1 overflow-y-auto space-y-3">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">
                  Đang tải danh sách lô hàng...
                </p>
              </div>
            ) : filteredBatches.length === 0 ? (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500">Không tìm thấy lô hàng nào</p>
              </div>
            ) : (
              filteredBatches.map((batch) => {
                const isSelected = pendingSelection.includes(batch._id);
                const isInStock = isCurrentlyInStock(batch._id);
                const status = getBatchStatus(batch);

                return (
                  <Card
                    key={batch._id}
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : `hover:shadow-sm ${getBatchStatusColor(status)}`
                    }`}
                    onClick={() => toggleBatchSelection(batch._id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                isSelected
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {isSelected && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>

                            <div>
                              <div className="font-medium text-gray-900">
                                {batch.batchNumber ||
                                  `Lô ${batch._id.slice(-6)}`}
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  HSD: {formatDate(batch.expiryDate)}
                                </span>
                                {batch.importPrice && (
                                  <span>
                                    Giá nhập:{" "}
                                    {new Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(batch.importPrice)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {status === "expired" && (
                            <Badge variant="destructive" className="text-xs">
                              <X className="h-3 w-3 mr-1" />
                              Hết hạn
                            </Badge>
                          )}
                          {status === "expiring" && (
                            <Badge
                              variant="secondary"
                              className="text-orange-600 text-xs"
                            >
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Sắp hết hạn
                            </Badge>
                          )}
                          {isInStock && (
                            <Badge
                              variant="outline"
                              className="text-green-600 text-xs"
                            >
                              <Info className="h-3 w-3 mr-1" />
                              Đã gán
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={handleCancel}>
            Hủy
          </Button>
          <Button
            onClick={handleApply}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isLoading || isUpdating}
          >
            {isUpdating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang cập nhật...
              </>
            ) : (
              `Áp dụng (${pendingSelection.length} lô)`
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BatchSelectorModal;