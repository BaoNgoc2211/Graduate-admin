// "use client";

// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { useEffect, useMemo } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Loader2,
//   ArrowLeft,
//   CalendarIcon,
//   Plus,
//   Trash2,
//   ExternalLink,
// } from "lucide-react";
// import { format } from "date-fns";
// import { vi } from "date-fns/locale";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// // import type { PurchaseFormProps, IPurchase } from "@/interface/order/purchase.interface"
// import { useMedicines } from "@/hooks/medicine/medicine.hooks";
// import { useCreatePurchaseOrder, useUpdatePurchaseOrder } from "@/hooks/order/purchase.hooks";
// import { IPurchaseOrder } from "@/interface/order/purchase.interface";
// // import { useCreatePurchase, useUpdatePurchase } from "@/hooks/order/purchase.hooks"
// // import { useCreatePurchase, useUpdatePurchase } from "@/hooks/usePurchase"
// // import { useMedicines } from "@/hooks/useMedicine"

// export default function PurchaseForm({
//   defaultValue,
//   onSuccess,
//   onCancel,
// }: PurchaseFormProps) {
//   const router = useRouter();

//   // Lấy danh sách medicines cho dropdown
//   const { data: medicinesData } = useMedicines();
//   const medicines = medicinesData?.data || [];

//   // Khởi tạo form với react-hook-form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setFocus,
//     control,
//     setValue,
//     watch,
//   } = useForm<Omit<IPurchase, "_id">>({
//     defaultValues: {
//       date_in: defaultValue?.date_in || new Date(),
//       note: defaultValue?.note || "",
//       medicines: defaultValue?.medicines || [
//         {
//           _id: { name: "" },
//           batch_id: "",
//           quantity: 1,
//           price: 0,
//           VAT_Rate: 0,
//           CK_Rate: 0,
//           totalPrice: 0,
//         },
//       ],
//       totalAmount: defaultValue?.totalAmount || 0,
//     },
//   });

//   // Field array cho medicines
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "medicines",
//   });

//   // Watch các giá trị để tính toán
//   const watchedMedicines = watch("medicines");

//   // Xác định chế độ form (tạo mới hoặc cập nhật)
//   const isEditMode = !!defaultValue?._id;
//   const formTitle = isEditMode
//     ? "Cập nhật phiếu nhập hàng"
//     : "Thêm mới phiếu nhập hàng";

//   // Khởi tạo mutations với custom hooks
//   const createMutation = useCreatePurchaseOrder();
//   const updateMutation = useUpdatePurchaseOrder();

//   // Xác định mutation hiện tại và trạng thái loading
//   const currentMutation = isEditMode ? updateMutation : createMutation;
//   const isLoading = currentMutation.isPending;

//   /**
//    * Tính toán thành tiền cho từng dòng
//    */
//   const calculateLineTotal = (
//     quantity: number,
//     price: number,
//     vatRate: number,
//     ckRate: number
//   ) => {
//     const subtotal = quantity * price;
//     const vatAmount = subtotal * (vatRate / 100);
//     const discountAmount = subtotal * (ckRate / 100);
//     return subtotal + vatAmount - discountAmount;
//   };

//   /**
//    * Tính tổng tiền đơn hàng
//    */
//   const totalAmount = useMemo(() => {
//     return watchedMedicines.reduce((total, medicine) => {
//       return total + (medicine.totalPrice || 0);
//     }, 0);
//   }, [watchedMedicines]);

//   /**
//    * Cập nhật totalAmount khi có thay đổi
//    */
//   useEffect(() => {
//     setValue("totalAmount", totalAmount);
//   }, [totalAmount, setValue]);

//   /**
//    * Format giá tiền
//    */
//   const formatPrice = (price: number) => {
//     return new Intl.NumberFormat("vi-VN", {
//       style: "currency",
//       currency: "VND",
//     }).format(price);
//   };

//   /**
//    * Thêm dòng thuốc mới
//    */
//   const addMedicineLine = () => {
//     append({
//       _id: { name: "" },
//       batch_id: "",
//       quantity: 1,
//       price: 0,
//       VAT_Rate: 0,
//       CK_Rate: 0,
//       totalPrice: 0,
//     });
//   };

//   /**
//    * Xóa dòng thuốc
//    */
//   const removeMedicineLine = (index: number) => {
//     if (fields.length > 1) {
//       remove(index);
//     } else {
//       toast.error("Phải có ít nhất một dòng thuốc!");
//     }
//   };

//   /**
//    * Chuyển hướng đến trang medicine
//    */
//   const goToMedicinePage = () => {
//     router.push("/medicine");
//   };

//   /**
//    * Xử lý submit form
//    */
//   const onSubmit = (data: Omit<IPurchaseOrder, "_id">) => {
//     // Kiểm tra có ít nhất một dòng thuốc
//     if (!data.medicines || data.medicines.length === 0) {
//       toast.error("Vui lòng thêm ít nhất một dòng thuốc!");
//       return;
//     }

//     // Kiểm tra các dòng thuốc có đầy đủ thông tin
//     for (let i = 0; i < data.medicines.length; i++) {
//       const medicine = data.medicines[i];
//       if (
//         !medicine._id.name ||
//         !medicine.batch_id ||
//         medicine.quantity <= 0 ||
//         medicine.price <= 0
//       ) {
//         toast.error(`Vui lòng điền đầy đủ thông tin cho dòng thuốc ${i + 1}!`);
//         return;
//       }
//     }

//     if (isEditMode && defaultValue?._id) {
//       // Cập nhật phiếu nhập hàng
//       updateMutation.mutate(
//         {
//           id: defaultValue._id,
//           data: data as IPurchase,
//         },
//         {
//           onSuccess: () => {
//             toast.success("Cập nhật phiếu nhập hàng thành công!");
//             onSuccess?.();
//           },
//           onError: (error) => {
//             toast.error("Cập nhật phiếu nhập hàng thất bại!");
//             console.error("Update error:", error);
//           },
//         }
//       );
//     } else {
//       // Tạo mới phiếu nhập hàng
//       createMutation.mutate(data as IPurchase, {
//         onSuccess: () => {
//           toast.success("Tạo phiếu nhập hàng thành công!");
//           onSuccess?.();
//         },
//         onError: (error) => {
//           toast.error("Tạo phiếu nhập hàng thất bại!");
//           console.error("Create error:", error);
//         },
//       });
//     }
//   };

//   /**
//    * Xử lý nút quay lại/hủy
//    */
//   const handleCancel = () => {
//     reset();
//     onCancel?.();
//   };

//   // Auto focus vào input đầu tiên khi component mount
//   useEffect(() => {
//     setFocus("date_in");
//   }, [setFocus]);

//   return (
//     <div className="w-full max-w-full mx-auto">
//       <div className="bg-white rounded-lg shadow-sm border">
//         {/* Header */}
//         <div className="bg-blue-900 text-white px-6 py-4 rounded-t-lg">
//           <h2 className="text-xl font-semibold">{formTitle}</h2>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Thông tin cơ bản */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">
//                 Thông tin phiếu nhập hàng
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Ngày nhập hàng */}
//                 <div className="space-y-2">
//                   <Label className="text-sm font-medium text-gray-700">
//                     Ngày nhập hàng <span className="text-red-500">*</span>
//                   </Label>
//                   <Controller
//                     name="date_in"
//                     control={control}
//                     rules={{ required: "Ngày nhập hàng là bắt buộc" }}
//                     render={({ field }) => (
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant="outline"
//                             className={cn(
//                               "w-full justify-start text-left font-normal focus:ring-2 focus:ring-blue-500",
//                               !field.value && "text-muted-foreground"
//                             )}
//                             disabled={isLoading}
//                           >
//                             <CalendarIcon className="mr-2 h-4 w-4" />
//                             {field.value
//                               ? format(field.value, "dd/MM/yyyy", {
//                                   locale: vi,
//                                 })
//                               : "Chọn ngày nhập hàng"}
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0">
//                           <Calendar
//                             mode="single"
//                             selected={field.value}
//                             onSelect={field.onChange}
//                             initialFocus
//                             locale={vi}
//                           />
//                         </PopoverContent>
//                       </Popover>
//                     )}
//                   />
//                   {errors.date_in && (
//                     <p className="text-sm text-red-600">
//                       {errors.date_in.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Ghi chú */}
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="note"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Ghi chú
//                   </Label>
//                   <Textarea
//                     id="note"
//                     {...register("note")}
//                     placeholder="Nhập ghi chú cho phiếu nhập hàng"
//                     className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Danh sách thuốc */}
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold text-blue-900 border-b border-gray-200 pb-2">
//                   Danh sách thuốc nhập
//                 </h3>
//                 <div className="flex gap-2">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     size="sm"
//                     onClick={goToMedicinePage}
//                     className="bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100"
//                   >
//                     <ExternalLink className="h-4 w-4 mr-2" />
//                     Quản lý thuốc
//                   </Button>
//                   <Button
//                     type="button"
//                     onClick={addMedicineLine}
//                     className="bg-blue-900 hover:bg-blue-800"
//                     disabled={isLoading}
//                   >
//                     <Plus className="h-4 w-4 mr-2" />
//                     Thêm dòng
//                   </Button>
//                 </div>
//               </div>

//               {/* Bảng thuốc - Desktop */}
//               <div className="hidden xl:block overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-gray-50">
//                       <TableHead className="font-semibold text-blue-900 min-w-[200px]">
//                         Thuốc
//                       </TableHead>
//                       <TableHead className="font-semibold text-blue-900 min-w-[120px]">
//                         Batch ID
//                       </TableHead>
//                       <TableHead className="font-semibold text-blue-900 min-w-[100px]">
//                         Số lượng
//                       </TableHead>
//                       <TableHead className="font-semibold text-blue-900 min-w-[120px]">
//                         Đơn giá
//                       </TableHead>
//                       <TableHead className="font-semibold text-blue-900 min-w-[100px]">
//                         VAT (%)
//                       </TableHead>
//                       <TableHead className="font-semibold text-blue-900 min-w-[100px]">
//                         CK (%)
//                       </TableHead>
//                       <TableHead className="font-semibold text-blue-900 min-w-[150px]">
//                         Thành tiền
//                       </TableHead>
//                       <TableHead className="font-semibold text-blue-900 text-center min-w-[100px]">
//                         Hành động
//                       </TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {fields.map((field, index) => (
//                       <TableRow key={field.id}>
//                         <TableCell>
//                           <Controller
//                             name={`medicines.${index}._id.name`}
//                             control={control}
//                             rules={{ required: "Vui lòng chọn thuốc" }}
//                             render={({ field }) => (
//                               <Select
//                                 value={field.value}
//                                 onValueChange={field.onChange}
//                                 disabled={isLoading}
//                               >
//                                 <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
//                                   <SelectValue placeholder="Chọn thuốc" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   {medicines.map((medicine) => (
//                                     <SelectItem
//                                       key={medicine.code}
//                                       value={medicine.code}
//                                     >
//                                       {medicine.name}
//                                     </SelectItem>
//                                   ))}
//                                 </SelectContent>
//                               </Select>
//                             )}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Input
//                             {...register(`medicines.${index}.batch_id`, {
//                               required: "Batch ID là bắt buộc",
//                             })}
//                             placeholder="Batch ID"
//                             className="focus:ring-2 focus:ring-blue-500"
//                             disabled={isLoading}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Controller
//                             name={`medicines.${index}.quantity`}
//                             control={control}
//                             rules={{
//                               required: "Số lượng là bắt buộc",
//                               min: {
//                                 value: 1,
//                                 message: "Số lượng phải lớn hơn 0",
//                               },
//                             }}
//                             render={({ field }) => (
//                               <Input
//                                 type="number"
//                                 min="1"
//                                 value={field.value}
//                                 onChange={(e) => {
//                                   const quantity =
//                                     Number.parseInt(e.target.value) || 0;
//                                   field.onChange(quantity);
//                                   const price =
//                                     watchedMedicines[index]?.price || 0;
//                                   const vatRate =
//                                     watchedMedicines[index]?.VAT_Rate || 0;
//                                   const ckRate =
//                                     watchedMedicines[index]?.CK_Rate || 0;
//                                   const totalPrice = calculateLineTotal(
//                                     quantity,
//                                     price,
//                                     vatRate,
//                                     ckRate
//                                   );
//                                   setValue(
//                                     `medicines.${index}.totalPrice`,
//                                     totalPrice
//                                   );
//                                 }}
//                                 className="focus:ring-2 focus:ring-blue-500"
//                                 disabled={isLoading}
//                               />
//                             )}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Controller
//                             name={`medicines.${index}.price`}
//                             control={control}
//                             rules={{
//                               required: "Đơn giá là bắt buộc",
//                               min: {
//                                 value: 0,
//                                 message: "Đơn giá phải lớn hơn 0",
//                               },
//                             }}
//                             render={({ field }) => (
//                               <Input
//                                 type="number"
//                                 min="0"
//                                 step="0.01"
//                                 value={field.value}
//                                 onChange={(e) => {
//                                   const price =
//                                     Number.parseFloat(e.target.value) || 0;
//                                   field.onChange(price);
//                                   const quantity =
//                                     watchedMedicines[index]?.quantity || 0;
//                                   const vatRate =
//                                     watchedMedicines[index]?.VAT_Rate || 0;
//                                   const ckRate =
//                                     watchedMedicines[index]?.CK_Rate || 0;
//                                   const totalPrice = calculateLineTotal(
//                                     quantity,
//                                     price,
//                                     vatRate,
//                                     ckRate
//                                   );
//                                   setValue(
//                                     `medicines.${index}.totalPrice`,
//                                     totalPrice
//                                   );
//                                 }}
//                                 className="focus:ring-2 focus:ring-blue-500"
//                                 disabled={isLoading}
//                               />
//                             )}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Controller
//                             name={`medicines.${index}.VAT_Rate`}
//                             control={control}
//                             render={({ field }) => (
//                               <Select
//                                 value={field.value.toString()}
//                                 onValueChange={(value) => {
//                                   const vatRate = Number.parseFloat(value);
//                                   field.onChange(vatRate);
//                                   const quantity =
//                                     watchedMedicines[index]?.quantity || 0;
//                                   const price =
//                                     watchedMedicines[index]?.price || 0;
//                                   const ckRate =
//                                     watchedMedicines[index]?.CK_Rate || 0;
//                                   const totalPrice = calculateLineTotal(
//                                     quantity,
//                                     price,
//                                     vatRate,
//                                     ckRate
//                                   );
//                                   setValue(
//                                     `medicines.${index}.totalPrice`,
//                                     totalPrice
//                                   );
//                                 }}
//                                 disabled={isLoading}
//                               >
//                                 <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
//                                   <SelectValue />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   <SelectItem value="0">0%</SelectItem>
//                                   <SelectItem value="5">5%</SelectItem>
//                                   <SelectItem value="10">10%</SelectItem>
//                                 </SelectContent>
//                               </Select>
//                             )}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <Controller
//                             name={`medicines.${index}.CK_Rate`}
//                             control={control}
//                             render={({ field }) => (
//                               <Input
//                                 type="number"
//                                 min="0"
//                                 max="100"
//                                 step="0.01"
//                                 value={field.value}
//                                 onChange={(e) => {
//                                   const ckRate =
//                                     Number.parseFloat(e.target.value) || 0;
//                                   field.onChange(ckRate);
//                                   const quantity =
//                                     watchedMedicines[index]?.quantity || 0;
//                                   const price =
//                                     watchedMedicines[index]?.price || 0;
//                                   const vatRate =
//                                     watchedMedicines[index]?.VAT_Rate || 0;
//                                   const totalPrice = calculateLineTotal(
//                                     quantity,
//                                     price,
//                                     vatRate,
//                                     ckRate
//                                   );
//                                   setValue(
//                                     `medicines.${index}.totalPrice`,
//                                     totalPrice
//                                   );
//                                 }}
//                                 className="focus:ring-2 focus:ring-blue-500"
//                                 disabled={isLoading}
//                               />
//                             )}
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <div className="font-medium text-green-600">
//                             {formatPrice(
//                               watchedMedicines[index]?.totalPrice || 0
//                             )}
//                           </div>
//                         </TableCell>
//                         <TableCell>
//                           <Button
//                             type="button"
//                             variant="outline"
//                             size="sm"
//                             onClick={() => removeMedicineLine(index)}
//                             className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
//                             disabled={isLoading || fields.length === 1}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>

//               {/* Cards cho tablet và mobile */}
//               <div className="xl:hidden space-y-4">
//                 {fields.map((field, index) => (
//                   <Card key={field.id} className="border border-gray-200">
//                     <CardContent className="p-4">
//                       <div className="space-y-4">
//                         <div className="flex justify-between items-center">
//                           <h4 className="font-medium text-blue-900">
//                             Thuốc #{index + 1}
//                           </h4>
//                           <Button
//                             type="button"
//                             variant="outline"
//                             size="sm"
//                             onClick={() => removeMedicineLine(index)}
//                             className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
//                             disabled={isLoading || fields.length === 1}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>

//                         <div className="grid grid-cols-1 gap-4">
//                           {/* Chọn thuốc */}
//                           <div className="space-y-2">
//                             <Label className="text-sm font-medium text-gray-700">
//                               Thuốc
//                             </Label>
//                             <Controller
//                               name={`medicines.${index}._id.name`}
//                               control={control}
//                               rules={{ required: "Vui lòng chọn thuốc" }}
//                               render={({ field }) => (
//                                 <Select
//                                   value={field.value}
//                                   onValueChange={field.onChange}
//                                   disabled={isLoading}
//                                 >
//                                   <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
//                                     <SelectValue placeholder="Chọn thuốc" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     {medicines.map((medicine) => (
//                                       <SelectItem
//                                         key={medicine.code}
//                                         value={medicine.code}
//                                       >
//                                         {medicine.name}
//                                       </SelectItem>
//                                     ))}
//                                   </SelectContent>
//                                 </Select>
//                               )}
//                             />
//                           </div>

//                           {/* Batch ID */}
//                           <div className="space-y-2">
//                             <Label className="text-sm font-medium text-gray-700">
//                               Batch ID
//                             </Label>
//                             <Input
//                               {...register(`medicines.${index}.batch_id`, {
//                                 required: "Batch ID là bắt buộc",
//                               })}
//                               placeholder="Nhập Batch ID"
//                               className="focus:ring-2 focus:ring-blue-500"
//                               disabled={isLoading}
//                             />
//                           </div>

//                           {/* Số lượng và Đơn giá */}
//                           <div className="grid grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium text-gray-700">
//                                 Số lượng
//                               </Label>
//                               <Controller
//                                 name={`medicines.${index}.quantity`}
//                                 control={control}
//                                 rules={{
//                                   required: "Số lượng là bắt buộc",
//                                   min: {
//                                     value: 1,
//                                     message: "Số lượng phải lớn hơn 0",
//                                   },
//                                 }}
//                                 render={({ field }) => (
//                                   <Input
//                                     type="number"
//                                     min="1"
//                                     value={field.value}
//                                     onChange={(e) => {
//                                       const quantity =
//                                         Number.parseInt(e.target.value) || 0;
//                                       field.onChange(quantity);
//                                       const price =
//                                         watchedMedicines[index]?.price || 0;
//                                       const vatRate =
//                                         watchedMedicines[index]?.VAT_Rate || 0;
//                                       const ckRate =
//                                         watchedMedicines[index]?.CK_Rate || 0;
//                                       const totalPrice = calculateLineTotal(
//                                         quantity,
//                                         price,
//                                         vatRate,
//                                         ckRate
//                                       );
//                                       setValue(
//                                         `medicines.${index}.totalPrice`,
//                                         totalPrice
//                                       );
//                                     }}
//                                     className="focus:ring-2 focus:ring-blue-500"
//                                     disabled={isLoading}
//                                   />
//                                 )}
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium text-gray-700">
//                                 Đơn giá
//                               </Label>
//                               <Controller
//                                 name={`medicines.${index}.price`}
//                                 control={control}
//                                 rules={{
//                                   required: "Đơn giá là bắt buộc",
//                                   min: {
//                                     value: 0,
//                                     message: "Đơn giá phải lớn hơn 0",
//                                   },
//                                 }}
//                                 render={({ field }) => (
//                                   <Input
//                                     type="number"
//                                     min="0"
//                                     step="0.01"
//                                     value={field.value}
//                                     onChange={(e) => {
//                                       const price =
//                                         Number.parseFloat(e.target.value) || 0;
//                                       field.onChange(price);
//                                       const quantity =
//                                         watchedMedicines[index]?.quantity || 0;
//                                       const vatRate =
//                                         watchedMedicines[index]?.VAT_Rate || 0;
//                                       const ckRate =
//                                         watchedMedicines[index]?.CK_Rate || 0;
//                                       const totalPrice = calculateLineTotal(
//                                         quantity,
//                                         price,
//                                         vatRate,
//                                         ckRate
//                                       );
//                                       setValue(
//                                         `medicines.${index}.totalPrice`,
//                                         totalPrice
//                                       );
//                                     }}
//                                     className="focus:ring-2 focus:ring-blue-500"
//                                     disabled={isLoading}
//                                   />
//                                 )}
//                               />
//                             </div>
//                           </div>

//                           {/* VAT và Chiết khấu */}
//                           <div className="grid grid-cols-2 gap-4">
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium text-gray-700">
//                                 VAT (%)
//                               </Label>
//                               <Controller
//                                 name={`medicines.${index}.VAT_Rate`}
//                                 control={control}
//                                 render={({ field }) => (
//                                   <Select
//                                     value={field.value.toString()}
//                                     onValueChange={(value) => {
//                                       const vatRate = Number.parseFloat(value);
//                                       field.onChange(vatRate);
//                                       const quantity =
//                                         watchedMedicines[index]?.quantity || 0;
//                                       const price =
//                                         watchedMedicines[index]?.price || 0;
//                                       const ckRate =
//                                         watchedMedicines[index]?.CK_Rate || 0;
//                                       const totalPrice = calculateLineTotal(
//                                         quantity,
//                                         price,
//                                         vatRate,
//                                         ckRate
//                                       );
//                                       setValue(
//                                         `medicines.${index}.totalPrice`,
//                                         totalPrice
//                                       );
//                                     }}
//                                     disabled={isLoading}
//                                   >
//                                     <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
//                                       <SelectValue />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                       <SelectItem value="0">0%</SelectItem>
//                                       <SelectItem value="5">5%</SelectItem>
//                                       <SelectItem value="10">10%</SelectItem>
//                                     </SelectContent>
//                                   </Select>
//                                 )}
//                               />
//                             </div>
//                             <div className="space-y-2">
//                               <Label className="text-sm font-medium text-gray-700">
//                                 Chiết khấu (%)
//                               </Label>
//                               <Controller
//                                 name={`medicines.${index}.CK_Rate`}
//                                 control={control}
//                                 render={({ field }) => (
//                                   <Input
//                                     type="number"
//                                     min="0"
//                                     max="100"
//                                     step="0.01"
//                                     value={field.value}
//                                     onChange={(e) => {
//                                       const ckRate =
//                                         Number.parseFloat(e.target.value) || 0;
//                                       field.onChange(ckRate);
//                                       const quantity =
//                                         watchedMedicines[index]?.quantity || 0;
//                                       const price =
//                                         watchedMedicines[index]?.price || 0;
//                                       const vatRate =
//                                         watchedMedicines[index]?.VAT_Rate || 0;
//                                       const totalPrice = calculateLineTotal(
//                                         quantity,
//                                         price,
//                                         vatRate,
//                                         ckRate
//                                       );
//                                       setValue(
//                                         `medicines.${index}.totalPrice`,
//                                         totalPrice
//                                       );
//                                     }}
//                                     className="focus:ring-2 focus:ring-blue-500"
//                                     disabled={isLoading}
//                                   />
//                                 )}
//                               />
//                             </div>
//                           </div>

//                           {/* Thành tiền */}
//                           <div className="space-y-2">
//                             <Label className="text-sm font-medium text-gray-700">
//                               Thành tiền
//                             </Label>
//                             <div className="p-3 bg-green-50 rounded-md border border-green-200">
//                               <div className="font-medium text-green-600 text-lg">
//                                 {formatPrice(
//                                   watchedMedicines[index]?.totalPrice || 0
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>

//             {/* Tổng tiền */}
//             <div className="space-y-4">
//               <div className="border-t border-gray-200 pt-4">
//                 <div className="flex justify-end">
//                   <div className="w-full max-w-md">
//                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                       <div className="flex justify-between items-center">
//                         <span className="text-lg font-semibold text-blue-900">
//                           Tổng tiền đơn hàng:
//                         </span>
//                         <span className="text-2xl font-bold text-blue-900">
//                           {formatPrice(totalAmount)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={handleCancel}
//                 disabled={isLoading}
//                 className="flex items-center gap-2 bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 {isEditMode ? "Hủy" : "Quay lại"}
//               </Button>

//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white flex-1 sm:flex-none"
//               >
//                 {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
//                 {isLoading ? "Đang xử lý..." : "Lưu phiếu nhập hàng"}
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
