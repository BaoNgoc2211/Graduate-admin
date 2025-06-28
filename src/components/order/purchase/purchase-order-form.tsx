"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  Plus,
  Save,
  X,
  Package,
  Calculator,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useMedicines } from "@/hooks/medicine/medicine.hooks";
import { useImportBatch } from "@/hooks/inventory/import-batch.hooks";
import {
  useCreatePurchaseOrder,
  useUpdatePurchaseOrder,
} from "@/hooks/order/purchase.hooks";
import {
  IPurchaseOrder,
  IPurchaseOrderPayload,
  PurchaseOrderFormProps,
} from "@/interface/order/purchase.interface";
import { calculateLineTotal, formatPrice } from "@/lib/format-price";
import MedicineRowInput from "./medicine-row-input";

const VAT_OPTIONS = [
  { value: 0, label: "0%" },
  { value: 5, label: "5%" },
  { value: 8, label: "8%" },
  { value: 10, label: "10%" },
];

export default function PurchaseOrderForm({
  mode,
  defaultValue,
  onCancel,
}: PurchaseOrderFormProps) {
  // Lấy dữ liệu từ API
  const { data: medicinesData } = useMedicines();
  const { data: batchesData } = useImportBatch();
  const medicines = medicinesData?.data || [];
  const batches = batchesData?.data || [];

  // Mutations
  const createMutation = useCreatePurchaseOrder();
  const updateMutation = useUpdatePurchaseOrder();
  const isLoading = createMutation.isPending || updateMutation.isPending;

  // Form setup
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IPurchaseOrder>({
    defaultValues: {
      date_in: defaultValue?.date_in || new Date(),
      note: defaultValue?.note || "",
      medicines: defaultValue?.medicines?.map((medicine) => ({
        ...medicine,
        // Tính lại totalPrice nếu chưa có hoặc = 0
        totalPrice:
          medicine.totalPrice ||
          calculateLineTotal(
            medicine.price || 0,
            medicine.quantity || 0,
            medicine.VAT_Rate || 0,
            medicine.CK_Rate || 0
          ),
      })) || [
        {
          medicine_id: "",
          batch_id: "",
          quantity: 1,
          price: 0,
          VAT_Rate: 5,
          CK_Rate: 0,
          totalPrice: 0,
        },
      ],
      totalAmount: defaultValue?.totalAmount || 0,
    },
  });

  // Field array cho medicines
  const { fields, append, remove } = useFieldArray({
    control,
    name: "medicines",
  });

  // Watch để tính toán real-time
  const watchedMedicines = watch("medicines");
  // const watchedDate = watch("date_in")

  // Tính tổng tiền
  const totalAmount = useMemo(() => {
    return watchedMedicines.reduce(
      (total, medicine) => total + (medicine.totalPrice || 0),
      0
    );
  }, [watchedMedicines]);

  // Cập nhật tổng tiền
  useEffect(() => {
    setValue("totalAmount", totalAmount);
  }, [totalAmount, setValue]);

  // Tính lại tất cả totalPrice khi component mount (cho edit mode)
  useEffect(() => {
    if (mode === "edit" && defaultValue?.medicines) {
      defaultValue.medicines.forEach((_, index) => {
        updateLineTotal(index);
      });
    }
  }, [mode, defaultValue]);

  // Thêm dòng thuốc mới
  const addMedicineLine = () => {
    append({
      medicine_id: "",
      batch_id: "",
      quantity: 1,
      price: 0,
      VAT_Rate: 5,
      CK_Rate: 0,
      totalPrice: 0,
    });
  };

  // Xóa dòng thuốc
  const removeMedicineLine = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast.error("Phải có ít nhất một dòng thuốc!");
    }
  };

  // Cập nhật thành tiền cho dòng thuốc
  const updateLineTotal = (index: number) => {
    const medicine = watchedMedicines[index];
    if (medicine) {
      const totalPrice = calculateLineTotal(
        medicine.price || 0,
        medicine.quantity || 0,
        medicine.VAT_Rate || 0,
        medicine.CK_Rate || 0
      );
      setValue(`medicines.${index}.totalPrice`, totalPrice, {
        shouldValidate: true,
      });
    }
  };

  // Xử lý submit form
  const onSubmit = (data: IPurchaseOrder) => {
    // Validation
    if (!data.medicines || data.medicines.length === 0) {
      toast.error("Vui lòng thêm ít nhất một dòng thuốc!");
      return;
    }

    for (let i = 0; i < data.medicines.length; i++) {
      const medicine = data.medicines[i];
      if (
        !medicine.medicine_id ||
        !medicine.batch_id ||
        medicine.quantity <= 0 ||
        medicine.price <= 0
      ) {
        toast.error(`Vui lòng điền đầy đủ thông tin cho dòng thuốc ${i + 1}!`);
        return;
      }
    }

    // Chuẩn bị payload
    const payload: IPurchaseOrderPayload = {
      date_in: data.date_in.toISOString(),
      note: data.note,
      medicines: data.medicines.map((medicine) => ({
        medicine_id: medicine.medicine_id,
        batch_id: medicine.batch_id,
        quantity: medicine.quantity,
        price: medicine.price,
        VAT_Rate: medicine.VAT_Rate,
        CK_Rate: medicine.CK_Rate,
      })),
    };

    // Gọi API
    if (mode === "create") {
      createMutation.mutate(payload);
    } else if (mode === "edit" && defaultValue?._id) {
      updateMutation.mutate({ id: defaultValue._id, data: payload });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-4">
            <div className="flex items-center space-x-3">
              <Package className="h-6 w-6 text-blue-900" />
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                {mode === "create"
                  ? "Tạo phiếu nhập hàng mới"
                  : "Cập nhật phiếu nhập hàng"}
              </h1>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
                className="w-full sm:w-auto bg-transparent"
              >
                <X className="h-4 w-4 mr-2" />
                Hủy
              </Button>
              <Button
                type="submit"
                form="purchase-form"
                disabled={isLoading}
                className="bg-blue-900 hover:bg-blue-800 w-full sm:w-auto"
              >
                <Save className="h-4 w-4 mr-2" />
                {mode === "create" ? "Tạo phiếu" : "Cập nhật"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form
          id="purchase-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          {/* Thông tin cơ bản */}
          <Card>
            <CardHeader className="bg-blue-50 border-b">
              <CardTitle className="text-blue-900">
                Thông tin phiếu nhập
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Ngày nhập kho */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Ngày nhập kho <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="date_in"
                    control={control}
                    rules={{ required: "Vui lòng chọn ngày nhập kho" }}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "dd/MM/yyyy", {
                                  locale: vi,
                                })
                              : "Chọn ngày"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.date_in && (
                    <p className="text-sm text-red-600">
                      {errors.date_in.message}
                    </p>
                  )}
                </div>

                {/* Ghi chú */}
                <div className="space-y-2">
                  <Label
                    htmlFor="note"
                    className="text-sm font-medium text-gray-700"
                  >
                    Ghi chú <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="note"
                    {...register("note", { required: "Vui lòng nhập ghi chú" })}
                    placeholder="Nhập ghi chú cho phiếu nhập hàng..."
                    className="min-h-[80px]"
                    disabled={isLoading}
                  />
                  {errors.note && (
                    <p className="text-sm text-red-600">
                      {errors.note.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danh sách thuốc */}
          <Card>
            <CardHeader className="bg-blue-50 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle className="text-blue-900">
                  Danh sách thuốc nhập
                </CardTitle>
                <Button
                  type="button"
                  onClick={addMedicineLine}
                  disabled={isLoading}
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm thuốc
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Desktop Table */}
              <div className="hidden xl:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          STT
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tên thuốc
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lô hàng
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Số lượng
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Đơn giá
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          VAT (%)
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          CK (%)
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thành tiền
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {fields.map((field, index) => (
                        <MedicineRowInput
                          key={field.id}
                          index={index}
                          control={control}
                          errors={errors}
                          medicines={medicines}
                          batches={batches}
                          onRemove={removeMedicineLine}
                          onUpdateTotal={updateLineTotal}
                          canRemove={fields.length > 1}
                          isLoading={isLoading}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile/Tablet Cards */}
              <div className="xl:hidden">
                <div className="space-y-4 p-4">
                  {fields.map((field, index) => (
                    <Card key={field.id} className="border border-gray-200">
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          {/* Header với STT và nút xóa */}
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">
                              Thuốc #{index + 1}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMedicineLine(index)}
                              disabled={isLoading || fields.length <= 1}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Tên thuốc */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Tên thuốc <span className="text-red-500">*</span>
                            </Label>
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
                                  <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500">
                                    <SelectValue placeholder="Chọn thuốc" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {medicines.map((medicine) => (
                                      <SelectItem
                                        key={medicine._id}
                                        value={medicine._id!}
                                      >
                                        <div className="flex flex-col">
                                          <span className="font-medium">
                                            {medicine.name}
                                          </span>
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
                              <p className="text-xs text-red-600">
                                {errors.medicines[index].medicine_id?.message}
                              </p>
                            )}
                          </div>

                          {/* Lô hàng */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Lô hàng <span className="text-red-500">*</span>
                            </Label>
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
                                  <SelectTrigger className="w-full focus:ring-2 focus:ring-blue-500">
                                    <SelectValue placeholder="Chọn lô hàng" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {batches.map((batch) => (
                                      <SelectItem
                                        key={batch._id}
                                        value={batch._id}
                                      >
                                        <div className="flex flex-col">
                                          <span className="font-medium">
                                            {batch.batchNumber}
                                          </span>
                                          <span className="text-xs text-gray-500">
                                            {typeof batch.distributor_id ===
                                            "object"
                                              ? batch.distributor_id.nameCo
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
                              <p className="text-xs text-red-600">
                                {errors.medicines[index].batch_id?.message}
                              </p>
                            )}
                          </div>

                          {/* Grid cho các input số */}
                          <div className="grid grid-cols-2 gap-4">
                            {/* Số lượng */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-700">
                                Số lượng <span className="text-red-500">*</span>
                              </Label>
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
                                      const quantity =
                                        Number.parseInt(e.target.value) || 0;
                                      field.onChange(quantity);
                                      setTimeout(
                                        () => updateLineTotal(index),
                                        0
                                      );
                                    }}
                                    className="text-center focus:ring-2 focus:ring-blue-500"
                                    disabled={isLoading}
                                  />
                                )}
                              />
                              {errors.medicines?.[index]?.quantity && (
                                <p className="text-xs text-red-600">
                                  {errors.medicines[index].quantity?.message}
                                </p>
                              )}
                            </div>

                            {/* Đơn giá */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-700">
                                Đơn giá <span className="text-red-500">*</span>
                              </Label>
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
                                      if (
                                        value.length > 1 &&
                                        value.startsWith("0") &&
                                        !value.includes(".")
                                      ) {
                                        return;
                                      }
                                      const price =
                                        Number.parseFloat(value) || 0;
                                      field.onChange(price);
                                      setTimeout(
                                        () => updateLineTotal(index),
                                        0
                                      );
                                    }}
                                    className="text-right focus:ring-2 focus:ring-blue-500"
                                    disabled={isLoading}
                                    placeholder="0"
                                  />
                                )}
                              />
                              {errors.medicines?.[index]?.price && (
                                <p className="text-xs text-red-600">
                                  {errors.medicines[index].price?.message}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Grid cho VAT và CK */}
                          <div className="grid grid-cols-2 gap-4">
                            {/* VAT */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-700">
                                VAT (%)
                              </Label>
                              <Controller
                                name={`medicines.${index}.VAT_Rate`}
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    value={field.value?.toString() || "5"}
                                    onValueChange={(value) => {
                                      const vatRate = Number.parseFloat(value);
                                      field.onChange(vatRate);
                                      setTimeout(
                                        () => updateLineTotal(index),
                                        0
                                      );
                                    }}
                                    disabled={isLoading}
                                  >
                                    <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
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
                            </div>

                            {/* Chiết khấu */}
                            <div className="space-y-2">
                              <Label className="text-sm font-medium text-gray-700">
                                CK (%)
                              </Label>
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
                                      const ckRate =
                                        Number.parseFloat(e.target.value) || 0;
                                      field.onChange(ckRate);
                                      setTimeout(
                                        () => updateLineTotal(index),
                                        0
                                      );
                                    }}
                                    className="text-center focus:ring-2 focus:ring-blue-500"
                                    disabled={isLoading}
                                    placeholder="0"
                                  />
                                )}
                              />
                            </div>
                          </div>

                          {/* Thành tiền */}
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">
                              Thành tiền
                            </Label>
                            <Controller
                              name={`medicines.${index}.totalPrice`}
                              control={control}
                              render={({ field }) => (
                                <div className="text-right font-bold text-lg text-green-600 bg-green-50 p-3 rounded-md">
                                  {formatPrice(field.value || 0)}
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Tổng cộng */}
              <div className="bg-gray-50 border-t p-4 sm:p-6">
                <div className="flex justify-end">
                  <div className="w-full sm:w-80">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Số loại thuốc:</span>
                        <span className="font-medium">
                          {fields.length} loại
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Tổng số lượng:</span>
                        <span className="font-medium">
                          {watchedMedicines.reduce(
                            (total, medicine) =>
                              total + (medicine.quantity || 0),
                            0
                          )}{" "}
                          sản phẩm
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900 flex items-center">
                          <Calculator className="h-5 w-5 mr-2" />
                          Tổng tiền:
                        </span>
                        <span className="text-xl sm:text-2xl font-bold text-blue-900">
                          {formatPrice(totalAmount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
