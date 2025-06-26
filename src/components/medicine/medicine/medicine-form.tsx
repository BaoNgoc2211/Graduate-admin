"use client"

import { useForm, Controller } from "react-hook-form"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import type { MedicineFormProps } from "@/interface/medicine/medicine.interface"
// import { useCreateMedicine, useUpdateMedicine } from "@/hooks/useMedicine"
// import { useMedicineCategories } from "@/hooks/useMedicineCategory"
// import { useMedicineUsages } from "@/hooks/useMedicineUsage"
// import { useManufactures } from "@/hooks/useManufacture"
// import ImageUpload from "@/components/image-upload"
import type { IMedicineFormData } from "@/interface/medicine/medicine.interface"
import { useMedicineCategories } from "@/hooks/medicine/category.hooks"
import { useMedicineUsages } from "@/hooks/medicine/usage.hooks"
import { useManufactures } from "@/hooks/inventory/manufacture.hooks"
import { useCreateMedicine, useUpdateMedicine } from "@/hooks/medicine/medicine.hooks"
import ImageUpload from "./image-upload"

export default function MedicineForm({ defaultValue, onSuccess, onCancel }: MedicineFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    control,
    setValue,
    watch,
  } = useForm<Omit<IMedicineFormData, "_id">>({
    defaultValues: {
      code: defaultValue?.code || "",
      name: defaultValue?.name || "",
      dosageForm: defaultValue?.dosageForm || "",
      quantity: defaultValue?.quantity || 0,
      sellingPrice: defaultValue?.sellingPrice || 0,
      thumbnail: defaultValue?.thumbnail || "",
      image: defaultValue?.image || [],
      packaging: defaultValue?.packaging || "",
      use: defaultValue?.use || "",
      active: defaultValue?.active || "",
      note: defaultValue?.note || "",
      age_group: defaultValue?.age_group || "",
      medCategory_id: defaultValue?.medCategory_id || [],
      medUsage_id: defaultValue?.medUsage_id || [],
      manufacturer_id:
        typeof defaultValue?.manufacturer_id === "object"
          ? defaultValue.manufacturer_id._id
          : defaultValue?.manufacturer_id || "",
    },
  })

  // Lấy dữ liệu cho dropdowns
  const { data: categoriesData } = useMedicineCategories()
  const { data: usagesData } = useMedicineUsages()
  const { data: manufacturersData } = useManufactures()

  const categories = categoriesData?.data || []
  const usages = usagesData?.data || []
  const manufacturers = manufacturersData?.data || []

  // Xác định chế độ form (tạo mới hoặc cập nhật)
  const isEditMode = !!defaultValue?._id
  const formTitle = isEditMode ? "Cập nhật thuốc" : "Thêm mới thuốc"

  // Khởi tạo mutations với custom hooks
  const createMutation = useCreateMedicine()
  const updateMutation = useUpdateMedicine()

  // Xác định mutation hiện tại và trạng thái loading
  const currentMutation = isEditMode ? updateMutation : createMutation
  const isLoading = currentMutation.isPending

  // Xử lý submit form
  const onSubmit = (data: Omit<IMedicineFormData, "_id">) => {
    // Kiểm tra ảnh thumbnail
    if (!data.thumbnail) {
      toast.error("Vui lòng upload ảnh đại diện!")
      return
    }

    if (isEditMode && defaultValue?._id) {
      // Cập nhật thuốc
      updateMutation.mutate(
        {
          id: defaultValue._id,
          data: data as IMedicineFormData,
        },
        {
          onSuccess: () => {
            toast.success("Cập nhật thuốc thành công!")
            onSuccess?.()
          },
          onError: (error) => {
            toast.error("Cập nhật thuốc thất bại!")
            console.error("Update error:", error)
          },
        },
      )
    } else {
      // Tạo mới thuốc
      createMutation.mutate(data as IMedicineFormData, {
        onSuccess: () => {
          toast.success("Tạo thuốc thành công!")
          onSuccess?.()
        },
        onError: (error) => {
          toast.error("Tạo thuốc thất bại!")
          console.error("Create error:", error)
        },
      })
    }
  }

  /**
   * Xử lý nút quay lại/hủy
   */
  const handleCancel = () => {
    reset()
    onCancel?.()
  }

  // Auto focus vào input đầu tiên khi component mount
  useEffect(() => {
    setFocus("code")
  }, [setFocus])

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="shadow-lg border-0 bg-white">
        <CardHeader className="bg-blue-900 text-white rounded-t-lg">
          <CardTitle className="text-xl font-semibold">{formTitle}</CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Thông tin cơ bản */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">Thông tin cơ bản</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mã thuốc */}
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-sm font-medium text-gray-700">
                    Mã thuốc <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="code"
                    {...register("code", {
                      required: "Mã thuốc là bắt buộc",
                      minLength: {
                        value: 2,
                        message: "Mã thuốc phải có ít nhất 2 ký tự",
                      },
                    })}
                    placeholder="Nhập mã thuốc"
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  />
                  {errors.code && <p className="text-sm text-red-600">{errors.code.message}</p>}
                </div>

                {/* Tên thuốc */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Tên thuốc <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    {...register("name", {
                      required: "Tên thuốc là bắt buộc",
                      minLength: {
                        value: 2,
                        message: "Tên thuốc phải có ít nhất 2 ký tự",
                      },
                    })}
                    placeholder="Nhập tên thuốc"
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  />
                  {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                </div>

                {/* Dạng bào chế */}
                <div className="space-y-2">
                  <Label htmlFor="dosageForm" className="text-sm font-medium text-gray-700">
                    Dạng bào chế <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dosageForm"
                    {...register("dosageForm", {
                      required: "Dạng bào chế là bắt buộc",
                    })}
                    placeholder="VD: Viên nén, Viên nang, Siro..."
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  />
                  {errors.dosageForm && <p className="text-sm text-red-600">{errors.dosageForm.message}</p>}
                </div>

                {/* Số lượng */}
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                    Số lượng <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    {...register("quantity", {
                      required: "Số lượng là bắt buộc",
                      min: {
                        value: 0,
                        message: "Số lượng phải lớn hơn hoặc bằng 0",
                      },
                      valueAsNumber: true,
                    })}
                    placeholder="Nhập số lượng"
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  />
                  {errors.quantity && <p className="text-sm text-red-600">{errors.quantity.message}</p>}
                </div>

                {/* Giá bán */}
                <div className="space-y-2">
                  <Label htmlFor="sellingPrice" className="text-sm font-medium text-gray-700">
                    Giá bán (VNĐ) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="sellingPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    {...register("sellingPrice", {
                      required: "Giá bán là bắt buộc",
                      min: {
                        value: 0,
                        message: "Giá bán phải lớn hơn 0",
                      },
                      valueAsNumber: true,
                    })}
                    placeholder="Nhập giá bán"
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  />
                  {errors.sellingPrice && <p className="text-sm text-red-600">{errors.sellingPrice.message}</p>}
                </div>

                {/* Nhóm tuổi */}
                <div className="space-y-2">
                  <Label htmlFor="age_group" className="text-sm font-medium text-gray-700">
                    Nhóm tuổi <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="age_group"
                    {...register("age_group", {
                      required: "Nhóm tuổi là bắt buộc",
                    })}
                    placeholder="VD: Người lớn, Trẻ em, Tất cả"
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  />
                  {errors.age_group && <p className="text-sm text-red-600">{errors.age_group.message}</p>}
                </div>
              </div>
            </div>

            {/* Upload ảnh */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">Hình ảnh</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Ảnh đại diện */}
                <Controller
                  name="thumbnail"
                  control={control}
                  rules={{ required: "Ảnh đại diện là bắt buộc" }}
                  render={({ field }) => (
                    <ImageUpload
                      label="Ảnh đại diện"
                      value={field.value}
                      onChange={field.onChange}
                      required
                      multiple={false}
                    />
                  )}
                />
                {errors.thumbnail && <p className="text-sm text-red-600">{errors.thumbnail.message}</p>}

                {/* Ảnh phụ */}
                <Controller
                  name="image"
                  control={control}
                  render={({ field }) => (
                    <ImageUpload
                      label="Ảnh phụ (tối đa 5 ảnh)"
                      value={field.value}
                      onChange={field.onChange}
                      multiple={true}
                      maxFiles={5}
                    />
                  )}
                />
              </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">Thông tin chi tiết</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Đóng gói */}
                <div className="space-y-2">
                  <Label htmlFor="packaging" className="text-sm font-medium text-gray-700">
                    Đóng gói <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="packaging"
                    {...register("packaging", {
                      required: "Thông tin đóng gói là bắt buộc",
                    })}
                    placeholder="VD: Hộp 10 vỉ x 10 viên"
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  />
                  {errors.packaging && <p className="text-sm text-red-600">{errors.packaging.message}</p>}
                </div>

                {/* Hoạt chất */}
                <div className="space-y-2">
                  <Label htmlFor="active" className="text-sm font-medium text-gray-700">
                    Hoạt chất <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="active"
                    {...register("active", {
                      required: "Hoạt chất là bắt buộc",
                    })}
                    placeholder="Nhập hoạt chất chính"
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    disabled={isLoading}
                  />
                  {errors.active && <p className="text-sm text-red-600">{errors.active.message}</p>}
                </div>

                {/* Nhà sản xuất */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Nhà sản xuất <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="manufacturer_id"
                    control={control}
                    rules={{ required: "Nhà sản xuất là bắt buộc" }}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange} disabled={isLoading}>
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Chọn nhà sản xuất" />
                        </SelectTrigger>
                        <SelectContent>
                          {manufacturers.map((manufacturer) => (
                            <SelectItem key={manufacturer._id} value={manufacturer._id!}>
                              {manufacturer.nameCo} - {manufacturer.country}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.manufacturer_id && <p className="text-sm text-red-600">{errors.manufacturer_id.message}</p>}
                </div>

                {/* Danh mục thuốc */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Danh mục thuốc <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="medCategory_id"
                    control={control}
                    rules={{ required: "Danh mục thuốc là bắt buộc" }}
                    render={({ field }) => (
                      <Select
                        value={Array.isArray(field.value) ? field.value[0] : field.value}
                        onValueChange={(value) => field.onChange([value])}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Chọn danh mục thuốc" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category._id} value={category._id!}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.medCategory_id && <p className="text-sm text-red-600">{errors.medCategory_id.message}</p>}
                </div>

                {/* Cách sử dụng */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Cách sử dụng <span className="text-red-500">*</span>
                  </Label>
                  <Controller
                    name="medUsage_id"
                    control={control}
                    rules={{ required: "Cách sử dụng là bắt buộc" }}
                    render={({ field }) => (
                      <Select
                        value={Array.isArray(field.value) ? field.value[0] : field.value}
                        onValueChange={(value) => field.onChange([value])}
                        disabled={isLoading}
                      >
                        <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Chọn cách sử dụng" />
                        </SelectTrigger>
                        <SelectContent>
                          {usages.map((usage) => (
                            <SelectItem key={usage._id} value={usage._id!}>
                              {usage.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.medUsage_id && <p className="text-sm text-red-600">{errors.medUsage_id.message}</p>}
                </div>
              </div>
            </div>

            {/* Thông tin mô tả */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">Mô tả chi tiết</h3>
              <div className="space-y-6">
                {/* Cách dùng */}
                <div className="space-y-2">
                  <Label htmlFor="use" className="text-sm font-medium text-gray-700">
                    Cách dùng <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="use"
                    {...register("use", {
                      required: "Cách dùng là bắt buộc",
                    })}
                    placeholder="Mô tả cách sử dụng thuốc"
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                    disabled={isLoading}
                  />
                  {errors.use && <p className="text-sm text-red-600">{errors.use.message}</p>}
                </div>

                {/* Ghi chú */}
                <div className="space-y-2">
                  <Label htmlFor="note" className="text-sm font-medium text-gray-700">
                    Ghi chú <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="note"
                    {...register("note", {
                      required: "Ghi chú là bắt buộc",
                    })}
                    placeholder="Ghi chú thêm về thuốc"
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                    disabled={isLoading}
                  />
                  {errors.note && <p className="text-sm text-red-600">{errors.note.message}</p>}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex items-center gap-2 bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                {isEditMode ? "Hủy" : "Quay lại"}
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white flex-1 sm:flex-none"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isLoading ? "Đang xử lý..." : "Lưu thông tin"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
