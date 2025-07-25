// "use client";

// import { medicineApi } from "@/api/medicine/medicine.api";
// import {
//   IMedicinePayload,
//   MedicineFilters,
// } from "@/interface/medicine/medicine.interface";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";

// export const useMedicines = (initialPage = 1, initialLimit = 10) => {
//   const router = useRouter();
//   const [currentPage, setCurrentPage] = useState(initialPage);
//   const [pageSize, setPageSize] = useState(initialLimit);
//   const [filters, setFilters] = useState<MedicineFilters>({});
//   const queryClient = useQueryClient();

//   // Get medicines with pagination
//   const {
//     data: medicinesData,
//     isLoading,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["medicines", currentPage, pageSize, filters],
//     queryFn: () => medicineApi.getMedicines(currentPage, pageSize, filters),
//     // keepPreviousDat: true,
//   });

//   // Get single medicine
//   const useMedicine = (id: string) => {
//     return useQuery({
//       queryKey: ["medicine", id],
//       queryFn: () => medicineApi.getMedicine(id),
//       enabled: !!id,
//     });
//   };

//   // Create medicine mutation
//   const createMutation = useMutation({
//     mutationFn: medicineApi.createMedicine,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["medicines"] });
//       toast.success("Tạo thuốc mới thành công!");
//     },
//     onError: () => {
//       toast.error("Có lỗi xảy ra khi tạo thuốc");
//     },
//   });

//   // Update medicine mutation
//   const updateMutation = useMutation({
//     mutationFn: ({
//       id,
//       data,
//     }: {
//       id: string;
//       data: Partial<IMedicinePayload>;
//     }) => medicineApi.updateMedicine(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["medicines"] });
//       toast.success("Cập nhật thuốc thành công!");
//       router.push("/medicine");
//     },
//     onError: () => {
//       toast.error("Có lỗi xảy ra khi cập nhật thuốc");
//     },
//   });

//   // Delete medicine mutation
//   const deleteMutation = useMutation({
//     mutationFn: medicineApi.deleteMedicine,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["medicines"] });
//       toast.success("Xóa thuốc thành công!");
//     },
//     onError: () => {
//       toast.error("Có lỗi xảy ra khi xóa thuốc");
//     },
//   });

//   // Upload image mutation
//   const uploadImageMutation = useMutation({
//     mutationFn: medicineApi.uploadImage,
//     onError: () => {
//       toast.error("Có lỗi xảy ra khi upload ảnh");
//     },
//   });

//   // Upload multiple images mutation
//   const uploadMultipleImagesMutation = useMutation({
//     mutationFn: medicineApi.uploadMultipleImages,
//     onError: () => {
//       toast.error("Có lỗi xảy ra khi upload ảnh");
//     },
//   });

//   // Helper functions
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handlePageSizeChange = (size: number) => {
//     setPageSize(size);
//     setCurrentPage(1); // Reset to first page when changing page size
//   };

//   const handleFiltersChange = (newFilters: MedicineFilters) => {
//     setFilters(newFilters);
//     setCurrentPage(1); // Reset to first page when changing filters
//   };

//   const handleCreate = async (data: IMedicinePayload) => {
//     return createMutation.mutateAsync(data);
//     console.log("handleCreate called with data:", data);
//   };

//   const handleUpdate = async (id: string, data: Partial<IMedicinePayload>) => {
//     return updateMutation.mutateAsync({ id, data });
//   };

//   const handleDelete = async (id: string) => {
//     return deleteMutation.mutateAsync(id);
//   };

//   const handleUploadImage = async (file: File) => {
//     return uploadImageMutation.mutateAsync(file);
//   };

//   const handleUploadMultipleImages = async (files: File[]) => {
//     return uploadMultipleImagesMutation.mutateAsync(files);
//   };

//   return {
//     // Data
//     medicines: medicinesData?.data?.data || [],
//     pagination: {
//       currentPage: medicinesData?.data?.currentPage || 1,
//       totalPages: medicinesData?.data?.totalPages || 1,
//       totalItems: medicinesData?.data?.totalItems || 0,
//       limit: medicinesData?.data?.limit || 10,
//     },
//     filters,

//     // Loading states
//     isLoading,
//     isCreating: createMutation.isPending,
//     isUpdating: updateMutation.isPending,
//     isDeleting: deleteMutation.isPending,
//     isUploading:
//       uploadImageMutation.isPending || uploadMultipleImagesMutation.isPending,

//     // Error states
//     error,

//     // Actions
//     refetch,
//     handlePageChange,
//     handlePageSizeChange,
//     handleFiltersChange,
//     handleCreate,
//     handleUpdate,
//     handleDelete,
//     handleUploadImage,
//     handleUploadMultipleImages,
//     useMedicine,
//   };
// };
"use client";

import { medicineApi } from "@/api/medicine/medicine.api";
import { IMedicinePayload, MedicineFilters } from "@/interface/medicine/medicine.interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
// import { medicineApi } from "@/api/medicine.api";
// import type {
//   IMedicinePayload,
//   MedicineFilters,
// } from "@/interfaces/medicine.interface";

export const useMedicines = (initialPage = 1, initialLimit = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialLimit);
  const [filters, setFilters] = useState<MedicineFilters>({});
  const queryClient = useQueryClient();

  // Get medicines with pagination
  const {
    data: medicinesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["medicines", currentPage, pageSize, filters],
    queryFn: () => medicineApi.getMedicines(currentPage, pageSize, filters),
    // keepPreviousData: true,
  });

  // Get single medicine
  const useMedicine = (id: string) => {
    return useQuery({
      queryKey: ["medicine", id],
      queryFn: () => medicineApi.getMedicine(id),
      enabled: !!id,
    });
  };

  // Create medicine mutation
  const createMutation = useMutation({
    mutationFn: medicineApi.createMedicine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      toast.success("Tạo thuốc mới thành công!");
    },
    onError: () => {
      toast.error(
         "Có lỗi xảy ra khi tạo thuốc"
      );
    },
  });

  // Update medicine mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<IMedicinePayload>;
    }) => medicineApi.updateMedicine(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      toast.success("Cập nhật thuốc thành công!");
    },
    onError: () => {
      toast.error(
         "Có lỗi xảy ra khi cập nhật thuốc"
      );
    },
  });

  // Delete medicine mutation
  const deleteMutation = useMutation({
    mutationFn: medicineApi.deleteMedicine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicines"] });
      toast.success("Xóa thuốc thành công!");
    },
    onError: () => {
      toast.error(
         "Có lỗi xảy ra khi xóa thuốc"
      );
    },
  });

  // Upload image mutation
  const uploadImageMutation = useMutation({
    mutationFn: medicineApi.uploadImage,
    onError: () => {
      toast.error(
         "Có lỗi xảy ra khi upload ảnh"
      );
    },
  });

  // Upload multiple images mutation
  const uploadMultipleImagesMutation = useMutation({
    mutationFn: medicineApi.uploadMultipleImages,
    onError: () => {
      toast.error(
         "Có lỗi xảy ra khi upload ảnh"
      );
    },
  });

  // Helper functions
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleFiltersChange = (newFilters: MedicineFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when changing filters
  };

  const handleCreate = async (data: IMedicinePayload) => {
    return createMutation.mutateAsync(data);
  };

  const handleUpdate = async (id: string, data: Partial<IMedicinePayload>) => {
    return updateMutation.mutateAsync({ id, data });
  };

  const handleDelete = async (id: string) => {
    return deleteMutation.mutateAsync(id);
  };

  const handleUploadImage = async (file: File) => {
    return uploadImageMutation.mutateAsync(file);
  };

  const handleUploadMultipleImages = async (files: File[]) => {
    return uploadMultipleImagesMutation.mutateAsync(files);
  };

  return {
    // Data
    medicines: medicinesData?.data?.data || [],
    pagination: {
      currentPage: medicinesData?.data?.currentPage || 1,
      totalPages: medicinesData?.data?.totalPages || 1,
      totalItems: medicinesData?.data?.totalItems || 0,
      limit: medicinesData?.data?.limit || 10,
    },
    filters,

    // Loading states
    isLoading,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isUploading:
      uploadImageMutation.isPending || uploadMultipleImagesMutation.isPending,

    // Error states
    error,

    // Actions
    refetch,
    handlePageChange,
    handlePageSizeChange,
    handleFiltersChange,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleUploadImage,
    handleUploadMultipleImages,
    useMedicine,
  };
};
