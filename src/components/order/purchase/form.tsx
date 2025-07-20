"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Plus, Trash2, Package, Pill } from "lucide-react"
import { IPurchaseEntry } from "@/interface/order/purchase.interface"
import { useCreateImportBatch, useCreateMedicine, useCreatePurchaseEntry, useImportBatches, useMedicines, useSuppliers, useUpdatePurchaseEntry } from "@/hooks/order/purchase.hooks"
import { formatPrice } from "@/lib/format-price"
// import type { IPurchaseEntry } from "@/interface/purchase/purchase.interface"
// import {
//   useSuppliers,
//   useMedicines,
//   useImportBatches,
//   useCreatePurchaseEntry,
//   useUpdatePurchaseEntry,
//   useCreateMedicine,
//   useCreateImportBatch,
// } from "@/hooks/usePurchase"
// import { formatPrice } from "@/lib/formatPrice"

const purchaseItemSchema = z.object({
  medicine: z.string().min(1, "Vui lòng chọn thuốc"),
  batch: z.string().min(1, "Vui lòng chọn lô hàng"),
  quantity: z.number().min(1, "Số lượng phải lớn hơn 0"),
  unitPrice: z.number().min(0, "Giá đơn vị không được âm"),
})

const purchaseFormSchema = z.object({
  supplier: z.string().min(1, "Vui lòng chọn nhà cung cấp"),
  items: z.array(purchaseItemSchema).min(1, "Phải có ít nhất 1 sản phẩm"),
  notes: z.string().optional(),
})

type PurchaseFormData = z.infer<typeof purchaseFormSchema>

interface PurchaseFormProps {
  entry?: IPurchaseEntry
  onSuccess: () => void
  onCancel: () => void
}

export function PurchaseForm({ entry, onSuccess, onCancel }: PurchaseFormProps) {
  const [medicineSearch, setMedicineSearch] = useState("")
  const [selectedMedicineForBatch, setSelectedMedicineForBatch] = useState<string>("")
  const [showMedicineDialog, setShowMedicineDialog] = useState(false)
  const [showBatchDialog, setShowBatchDialog] = useState(false)
  const [newMedicineData, setNewMedicineData] = useState({
    name: "",
    code: "",
    unit: "",
    category: "",
    manufacturer: "",
  })
  const [newBatchData, setNewBatchData] = useState({
    lotNumber: "",
    expiryDate: "",
    manufacturingDate: "",
    quantity: 0,
  })

  const { data: suppliersData } = useSuppliers()
  const { data: medicinesData } = useMedicines(medicineSearch)
  const { data: batchesData } = useImportBatches(selectedMedicineForBatch)

  const createEntryMutation = useCreatePurchaseEntry()
  const updateEntryMutation = useUpdatePurchaseEntry()
  const createMedicineMutation = useCreateMedicine()
  const createBatchMutation = useCreateImportBatch()

  const suppliers = suppliersData?.data || []
  const medicines = medicinesData?.data || []
  const batches = batchesData?.data || []

  const form = useForm<PurchaseFormData>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: {
      supplier: entry?.supplier._id || "",
      items: entry?.items.map((item) => ({
        medicine: item.medicine._id,
        batch: item.batch._id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })) || [{ medicine: "", batch: "", quantity: 1, unitPrice: 0 }],
      notes: entry?.notes || "",
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  const watchedItems = form.watch("items")

  // Calculate total amount
  const totalAmount = watchedItems.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice
  }, 0)

  const onSubmit = async (data: PurchaseFormData) => {
    try {
      if (entry) {
        await updateEntryMutation.mutateAsync({
          id: entry._id,
          data,
        })
      } else {
        await createEntryMutation.mutateAsync(data)
      }
      onSuccess()
    } catch (error) {
      console.error("Error saving purchase entry:", error)
    }
  }

  const handleCreateMedicine = async () => {
    try {
      const result = await createMedicineMutation.mutateAsync(newMedicineData)
      setShowMedicineDialog(false)
      setNewMedicineData({ name: "", code: "", unit: "", category: "", manufacturer: "" })
      // Auto-select the newly created medicine
      // This would require updating the form field
    } catch (error) {
      console.error("Error creating medicine:", error)
    }
  }

  const handleCreateBatch = async () => {
    try {
      const result = await createBatchMutation.mutateAsync({
        ...newBatchData,
        medicine: selectedMedicineForBatch,
      })
      setShowBatchDialog(false)
      setNewBatchData({ lotNumber: "", expiryDate: "", manufacturingDate: "", quantity: 0 })
      // Auto-select the newly created batch
      // This would require updating the form field
    } catch (error) {
      console.error("Error creating batch:", error)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-blue-900">
          {entry ? "Chỉnh sửa phiếu nhập kho" : "Tạo phiếu nhập kho mới"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Supplier Selection */}
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhà cung cấp *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nhà cung cấp" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier._id} value={supplier._id}>
                          {supplier.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Items Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Danh sách sản phẩm</h3>
                <Button
                  type="button"
                  onClick={() => append({ medicine: "", batch: "", quantity: 1, unitPrice: 0 })}
                  size="sm"
                  className="bg-blue-900 hover:bg-blue-800"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm sản phẩm
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Medicine Selection */}
                    <div className="lg:col-span-2">
                      <Label>Thuốc *</Label>
                      <div className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`items.${index}.medicine`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value)
                                  setSelectedMedicineForBatch(value)
                                }}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Chọn thuốc" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {medicines.map((medicine) => (
                                    <SelectItem key={medicine._id} value={medicine._id}>
                                      {medicine.name} ({medicine.code})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Dialog open={showMedicineDialog} onOpenChange={setShowMedicineDialog}>
                          <DialogTrigger asChild>
                            <Button type="button" variant="outline" size="sm">
                              <Pill className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Tạo thuốc mới</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Tên thuốc</Label>
                                <Input
                                  value={newMedicineData.name}
                                  onChange={(e) => setNewMedicineData((prev) => ({ ...prev, name: e.target.value }))}
                                />
                              </div>
                              <div>
                                <Label>Mã thuốc</Label>
                                <Input
                                  value={newMedicineData.code}
                                  onChange={(e) => setNewMedicineData((prev) => ({ ...prev, code: e.target.value }))}
                                />
                              </div>
                              <div>
                                <Label>Đơn vị</Label>
                                <Input
                                  value={newMedicineData.unit}
                                  onChange={(e) => setNewMedicineData((prev) => ({ ...prev, unit: e.target.value }))}
                                />
                              </div>
                              <div>
                                <Label>Danh mục</Label>
                                <Input
                                  value={newMedicineData.category}
                                  onChange={(e) =>
                                    setNewMedicineData((prev) => ({ ...prev, category: e.target.value }))
                                  }
                                />
                              </div>
                              <div>
                                <Label>Nhà sản xuất</Label>
                                <Input
                                  value={newMedicineData.manufacturer}
                                  onChange={(e) =>
                                    setNewMedicineData((prev) => ({ ...prev, manufacturer: e.target.value }))
                                  }
                                />
                              </div>
                              <Button
                                onClick={handleCreateMedicine}
                                disabled={createMedicineMutation.isPending}
                                className="w-full"
                              >
                                {createMedicineMutation.isPending ? "Đang tạo..." : "Tạo thuốc"}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    {/* Batch Selection */}
                    <div>
                      <Label>Lô hàng *</Label>
                      <div className="flex gap-2">
                        <FormField
                          control={form.control}
                          name={`items.${index}.batch`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Chọn lô" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {batches.map((batch) => (
                                    <SelectItem key={batch._id} value={batch._id}>
                                      {batch.lotNumber}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Dialog open={showBatchDialog} onOpenChange={setShowBatchDialog}>
                          <DialogTrigger asChild>
                            <Button type="button" variant="outline" size="sm" disabled={!selectedMedicineForBatch}>
                              <Package className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Tạo lô hàng mới</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label>Số lô</Label>
                                <Input
                                  value={newBatchData.lotNumber}
                                  onChange={(e) => setNewBatchData((prev) => ({ ...prev, lotNumber: e.target.value }))}
                                />
                              </div>
                              <div>
                                <Label>Ngày sản xuất</Label>
                                <Input
                                  type="date"
                                  value={newBatchData.manufacturingDate}
                                  onChange={(e) =>
                                    setNewBatchData((prev) => ({ ...prev, manufacturingDate: e.target.value }))
                                  }
                                />
                              </div>
                              <div>
                                <Label>Ngày hết hạn</Label>
                                <Input
                                  type="date"
                                  value={newBatchData.expiryDate}
                                  onChange={(e) => setNewBatchData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                                />
                              </div>
                              <div>
                                <Label>Số lượng</Label>
                                <Input
                                  type="number"
                                  value={newBatchData.quantity}
                                  onChange={(e) =>
                                    setNewBatchData((prev) => ({
                                      ...prev,
                                      quantity: Number.parseInt(e.target.value) || 0,
                                    }))
                                  }
                                />
                              </div>
                              <Button
                                onClick={handleCreateBatch}
                                disabled={createBatchMutation.isPending}
                                className="w-full"
                              >
                                {createBatchMutation.isPending ? "Đang tạo..." : "Tạo lô hàng"}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div>
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Số lượng *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1"
                                {...field}
                                onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Unit Price */}
                    <div>
                      <FormField
                        control={form.control}
                        name={`items.${index}.unitPrice`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Giá đơn vị *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                {...field}
                                onChange={(e) => field.onChange(Number.parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Remove Button */}
                    <div className="flex items-end">
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => remove(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="mt-2 text-right">
                    <span className="text-sm font-medium">
                      Thành tiền: {formatPrice(watchedItems[index]?.quantity * watchedItems[index]?.unitPrice || 0)}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Nhập ghi chú (tùy chọn)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Total Amount */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Tổng tiền:</span>
                <span className="text-blue-900">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <Button type="button" variant="outline" onClick={onCancel}>
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={createEntryMutation.isPending || updateEntryMutation.isPending}
                className="bg-blue-900 hover:bg-blue-800"
              >
                {createEntryMutation.isPending || updateEntryMutation.isPending
                  ? "Đang lưu..."
                  : entry
                    ? "Cập nhật"
                    : "Tạo phiếu"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
