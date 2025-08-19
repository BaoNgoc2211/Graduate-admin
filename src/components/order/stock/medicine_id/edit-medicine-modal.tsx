"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { X, Image as ImageIcon, Package, Edit } from "lucide-react";
import { useImportBatch } from "@/hooks/orders/purchase.hooks";
import { IStock } from "@/interface/order/stock.interface";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import { toast } from "sonner";
import { useMedicines } from "@/hooks/medicine/medicine.hooks";
import { useUpdateMedicineStockBatches } from "@/hooks/orders/stock.hooks"; // NEW IMPORT
import Image from "next/image";

// Schema for stock-specific medicine update
const stockMedicineUpdateSchema = z.object({
  name: z.string().min(1, "Tên thuốc không được để trống"),
  packaging: z.string().min(1, "Đóng gói không được để trống"),
  dosageForm: z.string().min(1, "Dạng bào chế không được để trống"),
  use: z.string().min(1, "Cách dùng không được để trống"),
  thumbnail: z.string().optional(),
  selectedBatches: z.array(z.string()).optional(),
});

type StockMedicineUpdateFormData = z.infer<typeof stockMedicineUpdateSchema>;

interface EditMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicine?: IMedicine;
  stocks: IStock[];
  onUpdate?: (medicineId: string, data: Partial<IMedicine>) => void;
}

const EditMedicineModal: React.FC<EditMedicineModalProps> = ({
  isOpen,
  onClose,
  medicine,
  stocks,
  onUpdate,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);

  const { handleUpdate, handleUploadImage, isUpdating, isUploading } = useMedicines();
  const { data: batchData } = useImportBatch();
  const availableBatches = batchData?.data || [];
  
  // NEW HOOK for updating stock batches
  const updateStockBatches = useUpdateMedicineStockBatches();

  const form = useForm<StockMedicineUpdateFormData>({
    resolver: zodResolver(stockMedicineUpdateSchema),
    defaultValues: {
      name: medicine?.name || "",
      packaging: medicine?.packaging || "",
      dosageForm: medicine?.dosageForm || "",
      use: medicine?.use || "",
      thumbnail: medicine?.thumbnail || "",
      selectedBatches: [],
    },
  });

  // Reset form when medicine changes
  useEffect(() => {
    if (medicine) {
      form.reset({
        name: medicine.name,
        packaging: medicine.packaging,
        dosageForm: medicine.dosageForm,
        use: medicine.use,
        thumbnail: medicine.thumbnail,
      });
      setPreviewUrl(medicine.thumbnail || "");
      
      // Get current batches from stocks
      const currentBatches = stocks
        .map(stock => typeof stock.importBatch === 'string' 
          ? stock.importBatch 
          : stock.importBatch?._id
        )
        .filter(Boolean) as string[];
      setSelectedBatches(currentBatches);
    }
  }, [medicine, stocks, form]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(medicine?.thumbnail || "");
    form.setValue("thumbnail", medicine?.thumbnail || "");
  };

  const toggleBatchSelection = (batchId: string) => {
    setSelectedBatches(prev => {
      if (prev.includes(batchId)) {
        return prev.filter(id => id !== batchId);
      } else {
        return [...prev, batchId];
      }
    });
  };

  const isStockBatch = (batchId: string): boolean => {
    return stocks.some(stock => 
      (typeof stock.importBatch === 'string' ? stock.importBatch : stock.importBatch?._id) === batchId
    );
  };

  const onSubmit = async (data: StockMedicineUpdateFormData) => {
    if (!medicine?._id) return;

    try {
      let thumbnailUrl = data.thumbnail;

      // Upload new image if selected
      if (selectedImage) {
        const uploadResult = await handleUploadImage(selectedImage);
        thumbnailUrl = uploadResult.url;
      }

      // Prepare medicine update data
      const medicineUpdateData = {
        name: data.name,
        packaging: data.packaging,
        dosageForm: data.dosageForm,
        use: data.use,
        thumbnail: thumbnailUrl,
      };

      // Update medicine basic info
      await handleUpdate(medicine._id, medicineUpdateData);

      // NEW: Update stock batches if they changed
      const currentBatches = stocks
        .map(stock => typeof stock.importBatch === 'string' 
          ? stock.importBatch 
          : stock.importBatch?._id
        )
        .filter(Boolean) as string[];

      const batchesChanged = 
        selectedBatches.length !== currentBatches.length ||
        selectedBatches.some(id => !currentBatches.includes(id)) ||
        currentBatches.some(id => !selectedBatches.includes(id));

      if (batchesChanged) {
        console.log("Updating stock batches:", {
          medicineId: medicine._id,
          oldBatches: currentBatches,
          newBatches: selectedBatches
        });

        await updateStockBatches.mutateAsync({
          medicineId: medicine._id,
          batchIds: selectedBatches,
          stockIds: stocks.map(stock => stock._id).join(","),
        });
      }
      
      // Call parent callback if provided
      if (onUpdate) {
        onUpdate(medicine._id, medicineUpdateData);
      }

      toast.success("Cập nhật thông tin thuốc và lô hàng thành công!");
      onClose();
    } catch (error) {
      console.error("Error updating medicine:", error);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin thuốc");
    }
  };

  const formatDate = (dateString: Date) => {
    try {
      return new Intl.DateTimeFormat("vi-VN").format(new Date(dateString));
    } catch {
      return "N/A";
    }
  };

  const isSubmitting = isUpdating || isUploading || updateStockBatches.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Chỉnh sửa thông tin thuốc
          </DialogTitle>
          <DialogDescription>
            Cập nhật thông tin cơ bản của thuốc và quản lý lô hàng hiển thị
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Medicine Info */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên thuốc *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nhập tên thuốc" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="packaging"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đóng gói *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Hộp, lọ, vỉ..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dosageForm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dạng bào chế *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn dạng bào chế" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Viên nén">Viên nén</SelectItem>
                          <SelectItem value="Viên nang">Viên nang</SelectItem>
                          <SelectItem value="Siro">Siro</SelectItem>
                          <SelectItem value="Thuốc tiêm">Thuốc tiêm</SelectItem>
                          <SelectItem value="Thuốc bôi">Thuốc bôi</SelectItem>
                          <SelectItem value="Thuốc nhỏ mắt">Thuốc nhỏ mắt</SelectItem>
                          <SelectItem value="Khác">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="use"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cách dùng *</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Hướng dẫn sử dụng thuốc..."
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column - Image & Batches */}
              <div className="space-y-4">
                {/* Image Upload */}
                <div>
                  <FormLabel>Ảnh thuốc</FormLabel>
                  <div className="mt-2">
                    {previewUrl ? (
                      <div className="relative">
                        <Image
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg border"
                          width={300}
                          height={200}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <span className="text-sm text-blue-600 hover:text-blue-500">
                              Chọn ảnh
                            </span>
                            <input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageSelect}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Batch Management */}
                <div>
                  <FormLabel className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Quản lý lô hàng
                  </FormLabel>
                  <p className="text-sm text-gray-500 mb-3">
                    Chọn các lô hàng hiển thị trong tồn kho ({selectedBatches.length} đã chọn)
                  </p>
                  
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {availableBatches.map((batch) => {
                      const isSelected = selectedBatches.includes(batch._id);
                      const isCurrentlyInStock = isStockBatch(batch._id);
                      
                      return (
                        <Card 
                          key={batch._id}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                          }`}
                          onClick={() => toggleBatchSelection(batch._id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">
                                  {batch.batchNumber}
                                </div>
                                <div className="text-sm text-gray-500">
                                  HSD: {formatDate(batch.expiryDate || "")}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                {isCurrentlyInStock && (
                                  <Badge variant="outline" className="text-green-600">
                                    Hiện tại
                                  </Badge>
                                )}
                                {isSelected && (
                                  <Badge className="bg-blue-600">
                                    Đã chọn
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                    
                    {availableBatches.length === 0 && (
                      <div className="text-center py-4 text-gray-500">
                        Không có lô hàng nào
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Hủy
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMedicineModal;