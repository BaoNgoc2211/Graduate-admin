"use client";
import { type Control, useFormContext, useWatch } from "react-hook-form";
import {
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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { IMedicine } from "@/interface/order/purchase.interface";
import { useImportBatch, useMedicines } from "@/hooks/orders/purchase.hooks";

interface PurchaseOrderItemRowProps {
  // control: Control<any>;
  control: Control<{
    medicines: {
      medicine_id: string;
      quantity: number;
      price: number;
      CK_Rate?: number;
      VAT_Rate?: number;
      batchId?: string;
      // notes?: string;
    }[];
  }> & {
    _formValues: {
      medicines: {
        price?: number;
      }[];
    };
  };
  index: number;
  onRemove: () => void;
  canRemove: boolean;
  medicineSearch: string;
  isLoading?: boolean;
}

export function PurchaseOrderItemRow({
  control,
  index,
  onRemove,
  canRemove,
  medicineSearch,
  isLoading = false,
}: PurchaseOrderItemRowProps) {
  const { data: medicinesData } = useMedicines(medicineSearch);
  const medicines = medicinesData?.data || [];

  const { data: batchData } = useImportBatch();
  const batchMedicines = batchData?.data || [];
  const quantity = useWatch({ control, name: `medicines.${index}.quantity` });
  const price = useWatch({ control, name: `medicines.${index}.price` });
  const ckRate = useWatch({ control, name: `medicines.${index}.CK_Rate` });
  const vatRate = useWatch({ control, name: `medicines.${index}.VAT_Rate` });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount || 0);
  };

  const calculateSubtotal = () => {
    if (!quantity || !price) return 0;
    const baseAmount = quantity * price;
    const ckAmount = baseAmount * ((ckRate || 0) / 100);
    const amountAfterCK = baseAmount - ckAmount;
    const vatAmount = amountAfterCK * ((vatRate || 0) / 100);
    return amountAfterCK + vatAmount;
  };
  const { setValue } = useFormContext();
  return (
    <div className="border rounded-lg p-4 space-y-4 bg-white">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Thuốc {index + 1}</h4>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            disabled={isLoading}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Medicine Selection */}
        <FormField
          control={control}
          name={`medicines.${index}.medicine_id`}
          render={({ field }) => (
            <FormItem className="w-[150px]">
              <FormLabel>Thuốc *</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  // Auto-fill price when medicine is selected
                  const medicine = medicines.find((m) => m._id === value);
                  if (medicine) {
                    control._formValues.medicines[index].price = medicine.price;
                  }
                }}
                value={field.value}
                disabled={isLoading}
              >
                <FormControl className="w-[150px] mb-2">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thuốc" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {medicines.map((medicine: IMedicine) => (
                    <SelectItem key={medicine._id} value={medicine._id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{medicine.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="min-h-[20px] " />
            </FormItem>
          )}
        />
        {/* Batch */}
        <FormField
          control={control}
          name={`medicines.${index}.batchId`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lô thuốc *</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={(value) => {
                  field.onChange(value);
                  const selected = batchMedicines.find((b) => b._id === value);
                  if (selected) {
                    setValue(`medicines.${index}.price`, selected.importPrice);
                  }
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn lô thuốc" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {batchMedicines.map((batch) => (
                    <SelectItem key={batch._id} value={batch._id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{batch.batchNumber}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="min-h-[20px]" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`medicines.${index}.price`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Đơn giá *</FormLabel>
              <FormControl className="mb-2">
                <Input
                  type="number"
                  min="0"
                  step="1000"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="min-h-[20px]" />
            </FormItem>
          )}
        />
        {/* Quantity */}
        <FormField
          control={control}
          name={`medicines.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số lượng *</FormLabel>
              <FormControl className="mb-2">
                <Input
                  type="number"
                  min="1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="min-h-[20px]" />
            </FormItem>
          )}
        />
        {/* CK Rate */}
        <FormField
          control={control}
          name={`medicines.${index}.CK_Rate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>CK (%)</FormLabel>
              <FormControl className="mb-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="min-h-[20px]" />
            </FormItem>
          )}
        />

        {/* VAT Rate */}
        <FormField
          control={control}
          name={`medicines.${index}.VAT_Rate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>VAT (%)</FormLabel>
              <FormControl className="mb-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="min-h-[20px]" />
            </FormItem>
          )}
        />

        {/* Notes */}
        {/* <FormField
          control={control}
          name={`medicines.${index}.notes`}
          render={({ field }) => (
            <FormItem className="lg:col-span-6">
              <FormLabel>Ghi chú</FormLabel>
              <FormControl className="mb-2">
                <Input
                  placeholder="Ghi chú cho thuốc này..."
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage className="min-h-[20px]" />
            </FormItem>
          )}
        /> */}
      </div>

      {/* Subtotal Display */}
      <div className="text-right border-t pt-3">
        <span className="text-sm text-gray-600">
          Thành tiền:{" "}
          <span className="font-semibold text-green-600">
            {formatCurrency(calculateSubtotal())}
          </span>
        </span>
      </div>
    </div>
  );
}
