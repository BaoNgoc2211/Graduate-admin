"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Package } from "lucide-react";
import { format } from "date-fns";
import type {
  IPurchaseOrder,
  IPurchaseOrderPayload,
} from "@/interface/order/purchase.interface";
import { PurchaseOrderItemRow } from "./item";
import {
  PurchaseOrderFormData,
  purchaseOrderSchema,
} from "@/schema/order/purchase.schema";
import InformationBasic from "./information-basic";
interface PurchaseOrderFormProps {
  defaultValues?: IPurchaseOrder;
  onSubmit: (data: IPurchaseOrderPayload) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export function PurchaseOrderForm({
  defaultValues,
  onSubmit,
  isLoading = false,
  submitLabel = "Tạo đơn mua hàng",
}: PurchaseOrderFormProps) {
  const [medicineSearch, setMedicineSearch] = useState("");

  const form = useForm<PurchaseOrderFormData>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      supplierId: defaultValues?.supplierId || "",
      date_in: defaultValues ? new Date(defaultValues.date_in) : new Date(),
      expectedDeliveryDate: defaultValues?.expectedDeliveryDate
        ? new Date(defaultValues.expectedDeliveryDate)
        : undefined,
      note: defaultValues?.note || "Nháp",
      totalAmount: defaultValues?.totalAmount || 0,
      medicines: defaultValues?.medicines?.map((item) => ({
        medicine_id: item.medicine_id,
        quantity: item.quantity,
        price: item.price,
        CK_Rate: item.CK_Rate || 0,
        VAT_Rate: item.VAT_Rate || 0,
        batch_id: item.batch_id || "",
      })) || [
        {
          medicine_id: "",
          quantity: 1,
          price: 0,
          CK_Rate: 0,
          VAT_Rate: 0,
          batch_id: "",
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "medicines",
  });

  // Reset form when defaultValues change
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        supplierId: defaultValues.supplierId,
        date_in: new Date(defaultValues.date_in),
        expectedDeliveryDate: defaultValues.expectedDeliveryDate
          ? new Date(defaultValues.expectedDeliveryDate)
          : undefined,
        totalAmount: defaultValues.totalAmount || 0,
        note: defaultValues.note || "Nháp",
        medicines: defaultValues.medicines.map((item) => ({
          medicine_id: item.medicine_id,
          quantity: item.quantity,
          price: item.price,
          CK_Rate: item.CK_Rate || 0,
          VAT_Rate: item.VAT_Rate || 0,
          batch_id: item.batch_id || "",
        })),
      });
    }
  }, [defaultValues, form]);

  const handleSubmit = async (data: PurchaseOrderFormData) => {
    try {
      const payload: IPurchaseOrderPayload = {
        supplierId: data.supplierId,
        date_in: format(data.date_in, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"),
        expectedDeliveryDate: data.expectedDeliveryDate
          ? format(data.expectedDeliveryDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
          : undefined,
        note: data.note,
        medicines: data.medicines.map((item) => ({
          medicine_id: item.medicine_id,
          quantity: item.quantity,
          price: item.price,
          VAT_Rate: item.VAT_Rate,
          CK_Rate: item.CK_Rate,
          batch_id: item.batch_id || undefined,
        })),
      };

      await onSubmit(payload);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const calculateTotal = () => {
    const medicines = form.watch("medicines");
    return medicines.reduce((total, item) => {
      const baseAmount = item.quantity * item.price;
      const ckAmount = baseAmount * ((item.CK_Rate || 0) / 100);
      const amountAfterCK = baseAmount - ckAmount;
      const vatAmount = amountAfterCK * ((item.VAT_Rate || 0) / 100);
      return total + amountAfterCK + vatAmount;
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              {defaultValues
                ? "Chỉnh sửa đơn mua hàng"
                : "Tạo đơn mua hàng mới"}
            </h1>
          </div>

          {/* <InformationBasic /> */}
          
          <InformationBasic
            form={form}
            isLoading={isLoading}
            defaultValues={defaultValues}
          />
          {/* Items */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Danh sách thuốc</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    medicine_id: "",
                    quantity: 1,
                    price: 0,
                    CK_Rate: 0,
                    VAT_Rate: 0,
                    // notes: "",
                  })
                }
                disabled={isLoading}
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm thuốc
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Medicine Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm thuốc..."
                  value={medicineSearch}
                  onChange={(e) => setMedicineSearch(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>

              {/* Item Rows */}
              {fields.map((field, index) => (
                <PurchaseOrderItemRow
                  key={field.id}
                  control={form.control}
                  index={index}
                  onRemove={() => remove(index)}
                  canRemove={fields.length > 1}
                  medicineSearch={medicineSearch}
                  isLoading={isLoading}
                />
              ))}

              {/* Total */}
              <div className="border-t pt-6">
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    Tổng cộng: {formatCurrency(calculateTotal())}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 px-8"
            >
              {isLoading ? "Đang xử lý..." : submitLabel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
