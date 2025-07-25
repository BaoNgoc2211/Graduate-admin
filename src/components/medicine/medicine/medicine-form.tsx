// "use client";

// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { Upload, X, Loader2, Save, ArrowLeft } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Badge } from "@/components/ui/badge";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import Image from "next/image";
// import { MedicineFormProps } from "@/interface/medicine/medicine.interface";
// import { useMedicines } from "@/hooks/medicine/medicine.hooks";
// import { useMedicineCategories } from "@/hooks/medicine/category.hooks";
// import { useMedicineUsages } from "@/hooks/medicine/usage.hooks";
// import { useManufactures } from "@/hooks/inventory/manufacture.hooks";
// import {
//   MedicineFormData,
//   medicineSchema,
// } from "@/schema/medicine/medicine.schema";

// export default function MedicineForm2({
//   defaultValue,
//   onSuccess,
//   onCancel,
// }: MedicineFormProps) {
//   const [uploadingImages, setUploadingImages] = useState<string[]>([]);
//   const [openSections, setOpenSections] = useState({
//     basic: true,
//     details: false,
//     safety: false,
//     categories: false,
//   });

//   const isEditMode = !!defaultValue?._id;

//   // Hooks
//   const {
//     handleCreate,
//     handleUpdate,
//     isCreating,
//     isUpdating,
//     handleUploadImage,
//     isUploading,
//   } = useMedicines();
//   const { data: categoriesData } = useMedicineCategories();
//   const { data: usagesData } = useMedicineUsages();
//   const { data: manufacturersData } = useManufactures();

//   const categories = categoriesData?.data || [];
//   const usages = usagesData?.data || [];
//   const manufacturers = manufacturersData?.data || [];

//   const isLoading = isCreating || isUpdating;

//   // Form setup
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     control,
//     setValue,
//     watch,
//     // reset,
//   } = useForm<MedicineFormData>({
//     resolver: zodResolver(medicineSchema),
//     defaultValues: {
//       code: defaultValue?.code || "",
//       name: defaultValue?.name || "",
//       thumbnail: defaultValue?.thumbnail || "",
//       image: defaultValue?.image || [],
//       packaging: defaultValue?.packaging || "",
//       dosageForm: defaultValue?.dosageForm || "",
//       use: defaultValue?.use || "",
//       dosage: defaultValue?.dosage || "",
//       indication: defaultValue?.indication || "",
//       adverse: defaultValue?.adverse || "",
//       contraindication: defaultValue?.contraindication || "",
//       precaution: defaultValue?.precaution || "",
//       ability: defaultValue?.ability || "",
//       pregnancy: defaultValue?.pregnancy || "",
//       drugInteractions: defaultValue?.drugInteractions || "",
//       storage: defaultValue?.storage || "",
//       note: defaultValue?.note || "",
//       age_group: defaultValue?.age_group || [],
//       medCategory_id: defaultValue?.medCategory_id || [],
//       medUsage_id: defaultValue?.medUsage_id || [],
//       manufacturer_id: {
//         _id:
//           typeof defaultValue?.manufacturer_id === "object"
//             ? defaultValue.manufacturer_id._id
//             : defaultValue?.manufacturer_id || "",
//         nameCo:
//           typeof defaultValue?.manufacturer_id === "object"
//             ? defaultValue.manufacturer_id.nameCo
//             : "",
//       },
//     },
//   });

//   const watchedImages = watch("image") || [];
//   const watchedThumbnail = watch("thumbnail");
//   const watchedCategories = watch("medCategory_id") || [];
//   const watchedUsages = watch("medUsage_id") || [];

//   // Toggle section visibility
//   const toggleSection = (section: keyof typeof openSections) => {
//     setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

//   // Image upload handler
//   const handleImageUpload = async (file: File, isThumb = false) => {
//     const uploadId = Math.random().toString(36).substr(2, 9);
//     try {
//       setUploadingImages((prev) => [...prev, uploadId]);

//       const result = await handleUploadImage(file);

//       if (isThumb) {
//         setValue("thumbnail", result.url);
//       } else {
//         const currentImages = watchedImages;
//         setValue("image", [...currentImages, result.url]);
//       }
//     } catch (error) {
//       console.error("Upload failed:", error);
//     } finally {
//       setUploadingImages((prev) => prev.filter((id) => id !== uploadId));
//     }
//   };

//   // Remove image handler
//   const removeImage = (index: number) => {
//     const currentImages = watchedImages;
//     setValue(
//       "image",
//       currentImages.filter((_, i) => i !== index)
//     );
//   };

//   // Category selection handlers
//   const handleCategoryChange = (categoryId: string, checked: boolean) => {
//     const currentCategories = watchedCategories;
//     if (checked) {
//       setValue("medCategory_id", [...currentCategories, categoryId]);
//     } else {
//       setValue(
//         "medCategory_id",
//         currentCategories.filter((id) => id !== categoryId)
//       );
//     }
//   };

//   // Usage selection handlers
//   const handleUsageChange = (usageId: string, checked: boolean) => {
//     const currentUsages = watchedUsages;
//     if (checked) {
//       setValue("medUsage_id", [...currentUsages, usageId]);
//     } else {
//       setValue(
//         "medUsage_id",
//         currentUsages.filter((id) => id !== usageId)
//       );
//     }
//   };

//   // Form submission
//   const onSubmit = async (data: MedicineFormData) => {
//     try {
//       const payload = {
//         ...data,
//         manufacturer_id: {
//           _id: data.manufacturer_id._id,
//           nameCo:
//             manufacturers.find((m) => m._id === data.manufacturer_id._id)
//               ?.nameCo || "",
//         },
//       };

//       if (isEditMode && defaultValue?._id) {
//         await handleUpdate(defaultValue._id, payload);
//       } else {
//         await handleCreate(payload);
//       }

//       onSuccess?.();
//     } catch (error) {
//       console.error("Form submission error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//       {/* Basic Information */}
//       <Card className="border-gray-200">
//         <Collapsible
//           open={openSections.basic}
//           onOpenChange={() => toggleSection("basic")}
//         >
//           <CollapsibleTrigger asChild>
//             <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
//                   Thông tin cơ bản
//                 </CardTitle>
//                 {openSections.basic ? (
//                   <ChevronUp className="h-5 w-5 text-gray-500" />
//                 ) : (
//                   <ChevronDown className="h-5 w-5 text-gray-500" />
//                 )}
//               </div>
//             </CardHeader>
//           </CollapsibleTrigger>
//           <CollapsibleContent>
//             <CardContent className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="code"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Mã thuốc <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="code"
//                     {...register("code")}
//                     placeholder="Nhập mã thuốc"
//                     disabled={isLoading}
//                     className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                   {errors.code && (
//                     <p className="text-sm text-red-600">
//                       {errors.code.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="name"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Tên thuốc <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="name"
//                     {...register("name")}
//                     placeholder="Nhập tên thuốc"
//                     disabled={isLoading}
//                     className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                   {errors.name && (
//                     <p className="text-sm text-red-600">
//                       {errors.name.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="dosageForm"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Dạng bào chế <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="dosageForm"
//                     {...register("dosageForm")}
//                     placeholder="VD: Viên nén, Viên nang, Siro..."
//                     disabled={isLoading}
//                     className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                   {errors.dosageForm && (
//                     <p className="text-sm text-red-600">
//                       {errors.dosageForm.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="age_group"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Nhóm tuổi <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="age_group"
//                     {...register("age_group")}
//                     placeholder="VD: Người lớn, Trẻ em, Tất cả"
//                     disabled={isLoading}
//                     className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                   {errors.age_group && (
//                     <p className="text-sm text-red-600">
//                       {errors.age_group.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Image Uploads */}
//               <div className="space-y-6">
//                 <Separator />

//                 {/* Thumbnail Upload */}
//                 <div className="space-y-3">
//                   <Label className="text-sm font-medium text-gray-700">
//                     Ảnh đại diện <span className="text-red-500">*</span>
//                   </Label>
//                   <div className="flex items-center gap-4">
//                     {watchedThumbnail && (
//                       <div className="relative">
//                         <Image
//                           src={watchedThumbnail || "/placeholder.svg"}
//                           alt="Thumbnail"
//                           className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
//                           width={80}
//                           height={80}
//                         />
//                         <Button
//                           type="button"
//                           variant="destructive"
//                           size="sm"
//                           className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
//                           onClick={() => setValue("thumbnail", "")}
//                         >
//                           <X className="h-3 w-3" />
//                         </Button>
//                       </div>
//                     )}
//                     <div>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => {
//                           const file = e.target.files?.[0];
//                           if (file) handleImageUpload(file, true);
//                         }}
//                         className="hidden"
//                         id="thumbnail-upload"
//                         disabled={isLoading || isUploading}
//                       />
//                       <Label
//                         htmlFor="thumbnail-upload"
//                         className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 transition-colors"
//                       >
//                         {isUploading ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <Upload className="h-4 w-4" />
//                         )}
//                         {watchedThumbnail
//                           ? "Thay đổi ảnh"
//                           : "Chọn ảnh đại diện"}
//                       </Label>
//                     </div>
//                   </div>
//                   {errors.thumbnail && (
//                     <p className="text-sm text-red-600">
//                       {errors.thumbnail.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Additional Images */}
//                 <div className="space-y-3">
//                   <Label className="text-sm font-medium text-gray-700">
//                     Ảnh bổ sung (tối đa 5 ảnh)
//                   </Label>
//                   <div className="flex flex-wrap gap-3">
//                     {watchedImages.map((image, index) => (
//                       <div key={index} className="relative">
//                         <Image
//                           src={image || "/placeholder.svg"}
//                           alt={`Image ${index + 1}`}
//                           className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
//                           width={80}
//                           height={80}
//                         />
//                         <Button
//                           type="button"
//                           variant="destructive"
//                           size="sm"
//                           className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
//                           onClick={() => removeImage(index)}
//                         >
//                           <X className="h-3 w-3" />
//                         </Button>
//                       </div>
//                     ))}

//                     {watchedImages.length < 5 && (
//                       <div>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) => {
//                             const file = e.target.files?.[0];
//                             if (file) handleImageUpload(file, false);
//                           }}
//                           className="hidden"
//                           id="images-upload"
//                           disabled={isLoading || isUploading}
//                         />
//                         <Label
//                           htmlFor="images-upload"
//                           className="cursor-pointer flex items-center justify-center w-20 h-20 bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 transition-colors"
//                         >
//                           {isUploading ? (
//                             <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
//                           ) : (
//                             <Upload className="h-6 w-6 text-gray-400" />
//                           )}
//                         </Label>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </CollapsibleContent>
//         </Collapsible>
//       </Card>

//       {/* Medicine Details */}
//       <Card className="border-gray-200">
//         <Collapsible
//           open={openSections.details}
//           onOpenChange={() => toggleSection("details")}
//         >
//           <CollapsibleTrigger asChild>
//             <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-lg text-gray-900">
//                   Chi tiết thuốc
//                 </CardTitle>
//                 {openSections.details ? (
//                   <ChevronUp className="h-5 w-5 text-gray-500" />
//                 ) : (
//                   <ChevronDown className="h-5 w-5 text-gray-500" />
//                 )}
//               </div>
//             </CardHeader>
//           </CollapsibleTrigger>
//           <CollapsibleContent>
//             <CardContent className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="packaging"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Đóng gói <span className="text-red-500">*</span>
//                   </Label>
//                   <Input
//                     id="packaging"
//                     {...register("packaging")}
//                     placeholder="VD: Hộp 10 vỉ x 10 viên"
//                     disabled={isLoading}
//                     className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                   {errors.packaging && (
//                     <p className="text-sm text-red-600">
//                       {errors.packaging.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="dosage"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Liều dùng
//                   </Label>
//                   <Input
//                     id="dosage"
//                     {...register("dosage")}
//                     placeholder="VD: 1-2 viên/lần, 2-3 lần/ngày"
//                     disabled={isLoading}
//                     className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="use"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Cách dùng <span className="text-red-500">*</span>
//                   </Label>
//                   <Textarea
//                     id="use"
//                     {...register("use")}
//                     placeholder="Mô tả cách sử dụng thuốc"
//                     className="min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                     disabled={isLoading}
//                   />
//                   {errors.use && (
//                     <p className="text-sm text-red-600">{errors.use.message}</p>
//                   )}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <Label
//                       htmlFor="indication"
//                       className="text-sm font-medium text-gray-700"
//                     >
//                       Công dụng
//                     </Label>
//                     <Textarea
//                       id="indication"
//                       {...register("indication")}
//                       placeholder="Mô tả công dụng của thuốc"
//                       className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                       disabled={isLoading}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label
//                       htmlFor="adverse"
//                       className="text-sm font-medium text-gray-700"
//                     >
//                       Tác dụng phụ
//                     </Label>
//                     <Textarea
//                       id="adverse"
//                       {...register("adverse")}
//                       placeholder="Mô tả các tác dụng phụ có thể xảy ra"
//                       className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                       disabled={isLoading}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </CollapsibleContent>
//         </Collapsible>
//       </Card>

//       {/* Safety Information */}
//       <Card className="border-gray-200">
//         <Collapsible
//           open={openSections.safety}
//           onOpenChange={() => toggleSection("safety")}
//         >
//           <CollapsibleTrigger asChild>
//             <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-lg text-gray-900">
//                   Thông tin an toàn
//                 </CardTitle>
//                 {openSections.safety ? (
//                   <ChevronUp className="h-5 w-5 text-gray-500" />
//                 ) : (
//                   <ChevronDown className="h-5 w-5 text-gray-500" />
//                 )}
//               </div>
//             </CardHeader>
//           </CollapsibleTrigger>
//           <CollapsibleContent>
//             <CardContent className="p-6 space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="contraindication"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Chống chỉ định
//                   </Label>
//                   <Textarea
//                     id="contraindication"
//                     {...register("contraindication")}
//                     placeholder="Mô tả các trường hợp chống chỉ định"
//                     className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="precaution"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Thận trọng khi sử dụng
//                   </Label>
//                   <Textarea
//                     id="precaution"
//                     {...register("precaution")}
//                     placeholder="Các lưu ý thận trọng khi sử dụng"
//                     className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="ability"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Khả năng lái xe và vận hành máy móc
//                   </Label>
//                   <Textarea
//                     id="ability"
//                     {...register("ability")}
//                     placeholder="Ảnh hưởng đến khả năng lái xe và vận hành máy móc"
//                     className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="pregnancy"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Thời kỳ mang thai và cho con bú
//                   </Label>
//                   <Textarea
//                     id="pregnancy"
//                     {...register("pregnancy")}
//                     placeholder="Lưu ý khi sử dụng trong thời kỳ mang thai và cho con bú"
//                     className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="drugInteractions"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Tương tác thuốc
//                   </Label>
//                   <Textarea
//                     id="drugInteractions"
//                     {...register("drugInteractions")}
//                     placeholder="Các tương tác với thuốc khác"
//                     className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                     disabled={isLoading}
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="storage"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Bảo quản
//                   </Label>
//                   <Textarea
//                     id="storage"
//                     {...register("storage")}
//                     placeholder="Hướng dẫn bảo quản thuốc"
//                     className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </CollapsibleContent>
//         </Collapsible>
//       </Card>

//       {/* Categories and Manufacturer */}
//       <Card className="border-gray-200">
//         <Collapsible
//           open={openSections.categories}
//           onOpenChange={() => toggleSection("categories")}
//         >
//           <CollapsibleTrigger asChild>
//             <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-lg text-gray-900">
//                   Phân loại và nhà sản xuất
//                 </CardTitle>
//                 {openSections.categories ? (
//                   <ChevronUp className="h-5 w-5 text-gray-500" />
//                 ) : (
//                   <ChevronDown className="h-5 w-5 text-gray-500" />
//                 )}
//               </div>
//             </CardHeader>
//           </CollapsibleTrigger>
//           <CollapsibleContent>
//             <CardContent className="p-6 space-y-6">
//               {/* Manufacturer */}
//               <div className="space-y-2">
//                 <Label className="text-sm font-medium text-gray-700">
//                   Nhà sản xuất <span className="text-red-500">*</span>
//                 </Label>
//                 <Controller
//                   name="manufacturer_id._id"
//                   control={control}
//                   render={({ field }) => (
//                     <Select
//                       value={field.value}
//                       onValueChange={(value) => {
//                         field.onChange(value);
//                         const manufacturer = manufacturers.find(
//                           (m) => m._id === value
//                         );
//                         setValue(
//                           "manufacturer_id.nameCo",
//                           manufacturer?.nameCo || ""
//                         );
//                       }}
//                       disabled={isLoading}
//                     >
//                       <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
//                         <SelectValue placeholder="Chọn nhà sản xuất" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {manufacturers.map((manufacturer) => (
//                           <SelectItem
//                             key={manufacturer._id}
//                             value={manufacturer._id!}
//                           >
//                             {manufacturer.nameCo} - {manufacturer.country}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//                 {errors.manufacturer_id?._id && (
//                   <p className="text-sm text-red-600">
//                     {errors.manufacturer_id._id.message}
//                   </p>
//                 )}
//               </div>

//               {/* Medicine Categories */}
//               <div className="space-y-3">
//                 <Label className="text-sm font-medium text-gray-700">
//                   Danh mục thuốc <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                   {categories.map((category) => (
//                     <div
//                       key={category._id}
//                       className="flex items-center space-x-2"
//                     >
//                       <Checkbox
//                         id={`category-${category._id}`}
//                         checked={watchedCategories.includes(category._id!)}
//                         onCheckedChange={(checked) =>
//                           handleCategoryChange(
//                             category._id!,
//                             checked as boolean
//                           )
//                         }
//                         disabled={isLoading}
//                       />
//                       <Label
//                         htmlFor={`category-${category._id}`}
//                         className="text-sm font-normal cursor-pointer"
//                       >
//                         {category.name}
//                       </Label>
//                     </div>
//                   ))}
//                 </div>
//                 {watchedCategories.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {watchedCategories.map((categoryId) => {
//                       const category = categories.find(
//                         (c) => c._id === categoryId
//                       );
//                       return category ? (
//                         <Badge
//                           key={categoryId}
//                           variant="secondary"
//                           className="bg-blue-100 text-blue-800"
//                         >
//                           {category.name}
//                           <X
//                             className="h-3 w-3 ml-1 cursor-pointer"
//                             onClick={() =>
//                               handleCategoryChange(categoryId, false)
//                             }
//                           />
//                         </Badge>
//                       ) : null;
//                     })}
//                   </div>
//                 )}
//                 {errors.medCategory_id && (
//                   <p className="text-sm text-red-600">
//                     {errors.medCategory_id.message}
//                   </p>
//                 )}
//               </div>

//               {/* Medicine Usages */}
//               <div className="space-y-3">
//                 <Label className="text-sm font-medium text-gray-700">
//                   Cách sử dụng <span className="text-red-500">*</span>
//                 </Label>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//                   {usages.map((usage) => (
//                     <div
//                       key={usage._id}
//                       className="flex items-center space-x-2"
//                     >
//                       <Checkbox
//                         id={`usage-${usage._id}`}
//                         checked={watchedUsages.includes(usage._id!)}
//                         onCheckedChange={(checked) =>
//                           handleUsageChange(usage._id!, checked as boolean)
//                         }
//                         disabled={isLoading}
//                       />
//                       <Label
//                         htmlFor={`usage-${usage._id}`}
//                         className="text-sm font-normal cursor-pointer"
//                       >
//                         {usage.name}
//                       </Label>
//                     </div>
//                   ))}
//                 </div>
//                 {watchedUsages.length > 0 && (
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {watchedUsages.map((usageId) => {
//                       const usage = usages.find((u) => u._id === usageId);
//                       return usage ? (
//                         <Badge
//                           key={usageId}
//                           variant="secondary"
//                           className="bg-green-100 text-green-800"
//                         >
//                           {usage.name}
//                           <X
//                             className="h-3 w-3 ml-1 cursor-pointer"
//                             onClick={() => handleUsageChange(usageId, false)}
//                           />
//                         </Badge>
//                       ) : null;
//                     })}
//                   </div>
//                 )}
//                 {errors.medUsage_id && (
//                   <p className="text-sm text-red-600">
//                     {errors.medUsage_id.message}
//                   </p>
//                 )}
//               </div>

//               {/* Note */}
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="note"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   Ghi chú <span className="text-red-500">*</span>
//                 </Label>
//                 <Textarea
//                   id="note"
//                   {...register("note")}
//                   placeholder="Ghi chú thêm về thuốc"
//                   className="min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                   disabled={isLoading}
//                 />
//                 {errors.note && (
//                   <p className="text-sm text-red-600">{errors.note.message}</p>
//                 )}
//               </div>
//             </CardContent>
//           </CollapsibleContent>
//         </Collapsible>
//       </Card>

//       {/* Action Buttons */}
//       <Card className="border-gray-200">
//         <CardContent className="p-6">
//           <div className="flex flex-col sm:flex-row gap-4 justify-end">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={onCancel}
//               disabled={isLoading}
//               className="sm:w-auto border-gray-300 hover:bg-gray-50 bg-transparent"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Hủy
//             </Button>
//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="bg-blue-900 hover:bg-blue-800 sm:w-auto"
//             >
//               {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
//               <Save className="h-4 w-4 mr-2" />
//               {isLoading
//                 ? "Đang xử lý..."
//                 : isEditMode
//                 ? "Cập nhật thuốc"
//                 : "Tạo thuốc mới"}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </form>
//   );
// }
