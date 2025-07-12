"use client";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import type { IMedicine } from "@/interface/medicine/medicine.interface";
import type { IImportBatch } from "@/interface/inventory/import-batch.interface";
import { IPurchaseOrder } from "@/interface/order/purchase.interface";
import { formatPrice } from "@/lib/format-price";

interface MedicineRowInputProps {
  index: number;
  control: Control<IPurchaseOrder>;
  errors: FieldErrors<IPurchaseOrder>;
  medicines: IMedicine[];
  batches: IImportBatch[];
  onRemove: (index: number) => void;
  onUpdateTotal: (index: number) => void;
  canRemove: boolean;
  isLoading: boolean;
}

const VAT_OPTIONS = [
  { value: 0, label: "0%" },
  { value: 5, label: "5%" },
  { value: 8, label: "8%" },
  { value: 10, label: "10%" },
];

export default function MedicineRowInput({
  index,
  control,
  errors,
  medicines,
  batches,
  onRemove,
  onUpdateTotal,
  canRemove,
  isLoading,
}: MedicineRowInputProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      {/* STT */}
      <td className="px-4 py-3 text-center text-sm font-medium text-gray-600">
        {index + 1}
      </td>

      {/* Tên thuốc */}
      <td className="px-4 py-3">
        <Controller
          name={`medicines.${index}.medicine_id`}
          control={control}
          rules={{ required: "Vui lòng chọn thuốc" }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full min-w-[200px] focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Chọn thuốc" />
              </SelectTrigger>
              <SelectContent>
                {medicines.map((medicine) => (
                  <SelectItem key={medicine._id} value={medicine._id!}>
                    <div className="flex flex-col">
                      <span className="font-medium">{medicine.name}</span>
                      <span className="text-xs text-gray-500">
                        {medicine.code}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.medicines?.[index]?.medicine_id && (
          <p className="text-xs text-red-600 mt-1">
            {errors.medicines[index].medicine_id?.message}
          </p>
        )}
      </td>

      {/* Lô hàng */}
      <td className="px-4 py-3">
        <Controller
          name={`medicines.${index}.batch_id`}
          control={control}
          rules={{ required: "Vui lòng chọn lô hàng" }}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isLoading}
            >
              <SelectTrigger className="w-full min-w-[180px] focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Chọn lô hàng" />
              </SelectTrigger>
              <SelectContent>
                {batches.map((batch) => (
                  <SelectItem key={batch._id} value={batch._id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{batch.batchNumber}</span>
                      <span className="text-xs text-gray-500">
                        {typeof batch.distributor_id === "object"
                          ? batch.distributor_id?.nameCo || "N/A"
                          : "N/A"}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.medicines?.[index]?.batch_id && (
          <p className="text-xs text-red-600 mt-1">
            {errors.medicines[index].batch_id?.message}
          </p>
        )}
      </td>

      {/* Số lượng */}
      <td className="px-4 py-3">
        <Controller
          name={`medicines.${index}.quantity`}
          control={control}
          rules={{
            required: "Bắt buộc",
            min: { value: 1, message: "Phải > 0" },
          }}
          render={({ field }) => (
            <Input
              type="number"
              min="1"
              value={field.value || ""}
              onChange={(e) => {
                const quantity = Number.parseInt(e.target.value) || 0;
                field.onChange(quantity);
                // Delay để đảm bảo state đã update
                setTimeout(() => onUpdateTotal(index), 0);
              }}
              className="w-20 text-center focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          )}
        />
        {errors.medicines?.[index]?.quantity && (
          <p className="text-xs text-red-600 mt-1">
            {errors.medicines[index].quantity?.message}
          </p>
        )}
      </td>

      {/* Đơn giá */}
      <td className="px-4 py-3">
        <Controller
          name={`medicines.${index}.price`}
          control={control}
          rules={{
            required: "Bắt buộc",
            min: { value: 1, message: "Phải > 0" },
          }}
          render={({ field }) => (
            <Input
              type="number"
              min="0"
              step="1000"
              value={field.value || ""}
              onChange={(e) => {
                const value = e.target.value;
                // Không cho phép số 0 đứng đầu
                if (
                  value.length > 1 &&
                  value.startsWith("0") &&
                  !value.includes(".")
                ) {
                  return;
                }
                const price = Number.parseFloat(value) || 0;
                field.onChange(price);
                // Delay để đảm bảo state đã update
                setTimeout(() => onUpdateTotal(index), 0);
              }}
              className="w-28 text-right focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
              placeholder="0"
            />
          )}
        />
        {errors.medicines?.[index]?.price && (
          <p className="text-xs text-red-600 mt-1">
            {errors.medicines[index].price?.message}
          </p>
        )}
      </td>

      {/* VAT */}
      <td className="px-4 py-3">
        <Controller
          name={`medicines.${index}.VAT_Rate`}
          control={control}
          render={({ field }) => (
            <Select
              value={field.value?.toString() || "5"}
              onValueChange={(value) => {
                const vatRate = Number.parseFloat(value);
                field.onChange(vatRate);
                // Delay để đảm bảo state đã update
                setTimeout(() => onUpdateTotal(index), 0);
              }}
              disabled={isLoading}
            >
              <SelectTrigger className="w-20 focus:ring-2 focus:ring-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VAT_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value.toString()}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </td>

      {/* Chiết khấu */}
      <td className="px-4 py-3">
        <Controller
          name={`medicines.${index}.CK_Rate`}
          control={control}
          render={({ field }) => (
            <Input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={field.value || ""}
              onChange={(e) => {
                const ckRate = Number.parseFloat(e.target.value) || 0;
                field.onChange(ckRate);
                // Delay để đảm bảo state đã update
                setTimeout(() => onUpdateTotal(index), 0);
              }}
              className="w-20 text-center focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
              placeholder="0"
            />
          )}
        />
      </td>

      {/* Thành tiền */}
      <td className="px-4 py-3">
        <Controller
          name={`medicines.${index}.totalPrice`}
          control={control}
          render={({ field }) => (
            <div className="text-right font-medium text-green-600 min-w-[120px]">
              {formatPrice(field.value || 0)}
            </div>
          )}
        />
      </td>

      {/* Hành động */}
      <td className="px-4 py-3 text-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemove(index)}
          disabled={isLoading || !canRemove}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}
