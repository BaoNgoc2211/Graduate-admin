// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { MedicineFormProps } from "@/interface/medicine/medicine.interface";
// import { useMedicineCategories } from "@/hooks/medicine/category.hooks";
// import { useMedicines } from "@/hooks/medicine/medicine.hooks";
// import { useMedicineUsages } from "@/hooks/medicine/usage.hooks";
// import { useManufactures } from "@/hooks/inventory/manufacture.hooks";
// import {
//   MedicineFormData,
//   medicineSchema,
// } from "@/schema/medicine/medicine.schema";

// // Import các component con
// import MedicineDetailsInfo from "./MedicineDetailsInfo";
// import MedicineSafetyInfo from "./MedicineSafetyInfo";
// import MedicineFormActions from "./MedicineFormActions";
// import MedicineCategorySelector from "./MedicineCategorySelector";
// import MedicineBasicInfo from "./MedicineBasicInfo";

// export default function MedicineForm({
//   defaultValue,
//   onSuccess,
//   onCancel,
// }: MedicineFormProps) {
//   // State quản lý UI
//   const [uploadingImages, setUploadingImages] = useState<string[]>([]);
//   const [openSections, setOpenSections] = useState({
//     basic: true,
//     details: false,
//     safety: false,
//     categories: false,
//   });

//   const isEditMode = !!defaultValue?._id;

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
//       age_group: defaultValue?.age_group || "Tất cả",
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

//   const toggleSection = (section: keyof typeof openSections) => {
//     setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

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

//   const removeImage = (index: number) => {
//     const currentImages = watchedImages;
//     setValue(
//       "image",
//       currentImages.filter((_, i) => i !== index)
//     );
//   };

//   const removeThumbnail = () => {
//     setValue("thumbnail", "");
//   };

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
//   console.log("Errors:", errors);
//   const onSubmit = async (data: MedicineFormData) => {
//     try {
//       const payload = {
//         ...data,
//       };

//       if (isEditMode && defaultValue?._id) {
//         await handleUpdate(defaultValue._id, payload);
//       } else {
//         await handleCreate(payload)
//       }
//       onSuccess?.();
//       console.log("Form submitted successfully:", payload);
//     } catch (error) {
//       console.error("Form submission error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//       {/* Basic Information */}
//       <MedicineBasicInfo
//         register={register}
//         errors={errors}
//         isLoading={isLoading}
//         isOpen={openSections.basic}
//         onToggle={() => toggleSection("basic")}
//         thumbnail={watchedThumbnail || ""}
//         images={watchedImages}
//         onThumbnailUpload={(file) => handleImageUpload(file, true)}
//         onImageUpload={(file) => handleImageUpload(file, false)}
//         onThumbnailRemove={removeThumbnail}
//         onImageRemove={removeImage}
//         isUploading={isUploading}
//       />

//       {/* Medicine Details */}
//       <MedicineDetailsInfo
//         register={register}
//         errors={errors}
//         isLoading={isLoading}
//         isOpen={openSections.details}
//         onToggle={() => toggleSection("details")}
//       />

//       {/* Safety Information */}
//       <MedicineSafetyInfo
//         register={register}
//         errors={errors}
//         isLoading={isLoading}
//         isOpen={openSections.safety}
//         onToggle={() => toggleSection("safety")}
//       />

//       {/* Categories and Manufacturer */}
//       <MedicineCategorySelector
//         control={control}
//         setValue={setValue}
//         errors={errors}
//         isLoading={isLoading}
//         isOpen={openSections.categories}
//         onToggle={() => toggleSection("categories")}
//         categories={categories}
//         usages={usages}
//         manufacturers={manufacturers}
//         watchedCategories={watchedCategories}
//         watchedUsages={watchedUsages}
//         onCategoryChange={handleCategoryChange}
//         onUsageChange={handleUsageChange}
//       />

//       {/* Action Buttons */}
//       <MedicineFormActions
//         isLoading={isLoading}
//         isEditMode={isEditMode}
//         onCancel={onCancel}
//         // onSubmit={handleSubmit(onSubmit)}
//       />
//     </form>
//   );
// }
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { MedicineFormProps } from "@/interface/medicine/medicine.interface";
import { useMedicineCategories } from "@/hooks/medicine/category.hooks";
import { useMedicines } from "@/hooks/medicine/medicine.hooks";
import { useMedicineUsages } from "@/hooks/medicine/usage.hooks";
import { useManufactures } from "@/hooks/inventory/manufacture.hooks";
import {
  MedicineFormData,
  medicineSchema,
} from "@/schema/medicine/medicine.schema";
import { toast } from "sonner";

// Import các component con
import MedicineDetailsInfo from "./MedicineDetailsInfo";
import MedicineSafetyInfo from "./MedicineSafetyInfo";
import MedicineFormActions from "./MedicineFormActions";
import MedicineCategorySelector from "./MedicineCategorySelector";
import MedicineBasicInfo from "./MedicineBasicInfo";

export default function MedicineForm({
  defaultValue,
  onSuccess,
  onCancel,
}: MedicineFormProps) {
  // State quản lý UI
  const [uploadingImages, setUploadingImages] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState({
    basic: true,
    details: false,
    safety: false,
    categories: false,
  });

  const isEditMode = !!defaultValue?._id;

  const {
    handleCreate,
    handleUpdate,
    isCreating,
    isUpdating,
    handleUploadImage,
    isUploading,
  } = useMedicines();
  
  const { data: categoriesData } = useMedicineCategories();
  const { data: usagesData } = useMedicineUsages();
  const { data: manufacturersData } = useManufactures();

  const categories = categoriesData?.data || [];
  const usages = usagesData?.data || [];
  const manufacturers = manufacturersData?.data || [];

  const isLoading = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm<MedicineFormData>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
      code: defaultValue?.code || "",
      name: defaultValue?.name || "",
      thumbnail: defaultValue?.thumbnail || "",
      image: defaultValue?.image || [],
      packaging: defaultValue?.packaging || "",
      dosageForm: defaultValue?.dosageForm || "",
      use: defaultValue?.use || "",
      dosage: defaultValue?.dosage || "",
      indication: defaultValue?.indication || "",
      adverse: defaultValue?.adverse || "",
      contraindication: defaultValue?.contraindication || "",
      precaution: defaultValue?.precaution || "",
      ability: defaultValue?.ability || "",
      pregnancy: defaultValue?.pregnancy || "",
      drugInteractions: defaultValue?.drugInteractions || "",
      storage: defaultValue?.storage || "",
      note: defaultValue?.note || "",
      age_group: defaultValue?.age_group || "Tất cả",
      medCategory_id: defaultValue?.medCategory_id || [],
      medUsage_id: defaultValue?.medUsage_id || [],
      manufacturer_id: {
        _id:
          typeof defaultValue?.manufacturer_id === "object"
            ? defaultValue.manufacturer_id._id
            : defaultValue?.manufacturer_id || "",
        nameCo:
          typeof defaultValue?.manufacturer_id === "object"
            ? defaultValue.manufacturer_id.nameCo
            : "",
      },
    },
  });

  const watchedImages = watch("image") || [];
  const watchedThumbnail = watch("thumbnail");
  const watchedCategories = watch("medCategory_id") || [];
  const watchedUsages = watch("medUsage_id") || [];

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleImageUpload = async (file: File, isThumb = false) => {
    const uploadId = Math.random().toString(36).substr(2, 9);
    try {
      setUploadingImages((prev) => [...prev, uploadId]);

      const result = await handleUploadImage(file);

      if (isThumb) {
        setValue("thumbnail", result.url);
      } else {
        const currentImages = watchedImages;
        setValue("image", [...currentImages, result.url]);
      }
      
      toast.success("Tải ảnh thành công!");
    } catch (error: any) {
      console.error("Upload failed:", error);
      toast.error(error?.message || "Tải ảnh thất bại. Vui lòng thử lại.");
    } finally {
      setUploadingImages((prev) => prev.filter((id) => id !== uploadId));
    }
  };

  const removeImage = (index: number) => {
    const currentImages = watchedImages;
    setValue(
      "image",
      currentImages.filter((_, i) => i !== index)
    );
  };

  const removeThumbnail = () => {
    setValue("thumbnail", "");
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const currentCategories = watchedCategories;
    if (checked) {
      setValue("medCategory_id", [...currentCategories, categoryId]);
    } else {
      setValue(
        "medCategory_id",
        currentCategories.filter((id) => id !== categoryId)
      );
    }
    // Clear errors when user makes changes
    clearErrors("medCategory_id");
  };

  const handleUsageChange = (usageId: string, checked: boolean) => {
    const currentUsages = watchedUsages;
    if (checked) {
      setValue("medUsage_id", [...currentUsages, usageId]);
    } else {
      setValue(
        "medUsage_id",
        currentUsages.filter((id) => id !== usageId)
      );
    }
    // Clear errors when user makes changes
    clearErrors("medUsage_id");
  };

  console.log("Form Errors:", errors);
  console.log("Watched Categories:", watchedCategories);
  console.log("Watched Usages:", watchedUsages);

  const onSubmit = async (data: MedicineFormData) => {
    try {
      console.log("Form data before submit:", data);

      // Validate required fields
      if (!data.name?.trim()) {
        toast.error("Tên thuốc không được để trống");
        setError("name", { 
          type: "manual", 
          message: "Tên thuốc không được để trống" 
        });
        setOpenSections(prev => ({ ...prev, basic: true }));
        return;
      }

      if (!data.code?.trim()) {
        toast.error("Mã thuốc không được để trống");
        setError("code", { 
          type: "manual", 
          message: "Mã thuốc không được để trống" 
        });
        setOpenSections(prev => ({ ...prev, basic: true }));
        return;
      }

      if (!data.manufacturer_id?._id) {
        toast.error("Vui lòng chọn nhà sản xuất");
        setError("manufacturer_id._id", { 
          type: "manual", 
          message: "Vui lòng chọn nhà sản xuất" 
        });
        setOpenSections(prev => ({ ...prev, categories: true }));
        return;
      }

      if (!data.medCategory_id || data.medCategory_id.length === 0) {
        toast.error("Vui lòng chọn ít nhất một danh mục thuốc");
        setError("medCategory_id", { 
          type: "manual", 
          message: "Vui lòng chọn ít nhất một danh mục thuốc" 
        });
        setOpenSections(prev => ({ ...prev, categories: true }));
        return;
      }

      if (!data.medUsage_id || data.medUsage_id.length === 0) {
        toast.error("Vui lòng chọn ít nhất một cách sử dụng thuốc");
        setError("medUsage_id", { 
          type: "manual", 
          message: "Vui lòng chọn ít nhất một cách sử dụng thuốc" 
        });
        setOpenSections(prev => ({ ...prev, categories: true }));
        return;
      }

      // Prepare payload
      const payload = {
        code: data.code.trim(),
        name: data.name.trim(),
        thumbnail: data.thumbnail || "",
        image: data.image || [],
        packaging: data.packaging?.trim() || "",
        dosageForm: data.dosageForm?.trim() || "",
        use: data.use?.trim() || "",
        dosage: data.dosage?.trim() || "",
        indication: data.indication?.trim() || "",
        adverse: data.adverse?.trim() || "Chưa có thông tin về tác dụng phụ",
        contraindication: data.contraindication?.trim() || "Chưa có thông tin về chống chỉ định",
        precaution: data.precaution?.trim() || "",
        ability: data.ability?.trim() || "Chưa có thông tin về khả năng lái xe và vận hành máy móc",
        pregnancy: data.pregnancy?.trim() || "Chưa có thông tin về thời kỳ mang thai và cho con bú",
        drugInteractions: data.drugInteractions?.trim() || "Chưa có thông tin về tương tác thuốc",
        storage: data.storage?.trim() || "",
        note: data.note?.trim() || "",
        age_group: data.age_group || "Tất cả",
        medCategory_id: data.medCategory_id,
        medUsage_id: data.medUsage_id,
        manufacturer_id: data.manufacturer_id,
        active: "active" as const,
      };

      console.log("Payload to send:", payload);

      let result;
      if (isEditMode && defaultValue?._id) {
        result = await handleUpdate(defaultValue._id, payload);
        toast.success("Cập nhật thuốc thành công!");
      } else {
        result = await handleCreate(payload);
        toast.success("Tạo thuốc mới thành công!");
      }

      onSuccess?.();
      console.log("Form submitted successfully:", result);
    } catch (error: any) {
      console.error("Form submission error:", error);
      
      // Handle specific errors
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error(
          isEditMode 
            ? "Cập nhật thuốc thất bại. Vui lòng thử lại." 
            : "Tạo thuốc thất bại. Vui lòng thử lại."
        );
      }
    }
  };

  // Handle validation errors
  const onInvalid = (errors: any) => {
    console.log("Validation errors:", errors);
    
    // Find first error and show toast
    const errorEntries = Object.entries(errors);
    if (errorEntries.length > 0) {
      const [fieldName, fieldError] = errorEntries[0];
      const errorMessage = (fieldError as any)?.message || `Lỗi ở trường ${fieldName}`;
      
      toast.error(errorMessage);
      
      // Auto-expand section with error
      if (['code', 'name', 'thumbnail', 'image', 'packaging'].includes(fieldName)) {
        setOpenSections(prev => ({ ...prev, basic: true }));
      } else if (['dosageForm', 'use', 'dosage', 'indication'].includes(fieldName)) {
        setOpenSections(prev => ({ ...prev, details: true }));
      } else if (['adverse', 'contraindication', 'precaution'].includes(fieldName)) {
        setOpenSections(prev => ({ ...prev, safety: true }));
      } else if (['medCategory_id', 'medUsage_id', 'manufacturer_id'].includes(fieldName)) {
        setOpenSections(prev => ({ ...prev, categories: true }));
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form 
        onSubmit={handleSubmit(onSubmit, onInvalid)} 
        className="space-y-8"
        noValidate
      >
        {/* Basic Information */}
        <MedicineBasicInfo
          register={register}
          errors={errors}
          isLoading={isLoading}
          isOpen={openSections.basic}
          onToggle={() => toggleSection("basic")}
          thumbnail={watchedThumbnail || ""}
          images={watchedImages}
          onThumbnailUpload={(file) => handleImageUpload(file, true)}
          onImageUpload={(file) => handleImageUpload(file, false)}
          onThumbnailRemove={removeThumbnail}
          onImageRemove={removeImage}
          isUploading={isUploading}
        />

        {/* Medicine Details */}
        <MedicineDetailsInfo
          register={register}
          errors={errors}
          isLoading={isLoading}
          isOpen={openSections.details}
          onToggle={() => toggleSection("details")}
        />

        {/* Safety Information */}
        <MedicineSafetyInfo
          register={register}
          errors={errors}
          isLoading={isLoading}
          isOpen={openSections.safety}
          onToggle={() => toggleSection("safety")}
        />

        {/* Categories and Manufacturer */}
        <MedicineCategorySelector
          control={control}
          setValue={setValue}
          errors={errors}
          isLoading={isLoading}
          isOpen={openSections.categories}
          onToggle={() => toggleSection("categories")}
          categories={categories}
          usages={usages}
          manufacturers={manufacturers}
          watchedCategories={watchedCategories}
          watchedUsages={watchedUsages}
          onCategoryChange={handleCategoryChange}
          onUsageChange={handleUsageChange}
        />

        {/* Action Buttons */}
        <MedicineFormActions
          isLoading={isLoading || isSubmitting}
          isEditMode={isEditMode}
          onCancel={onCancel}
        />
      </form>
    </div>
  );
}