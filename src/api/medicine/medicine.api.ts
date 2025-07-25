;import {
  IMedicine,
  IMedicinePayload,
  MedicineApiResponse,
  MedicineFilters,
} from "@/interface/medicine/medicine.interface";
import APIConfig from "../api.config";
//#region version 2
// export const medicineApi = {
//   // Get all medicines with pagination and filters
//   getAll: async (
//     page = 1,
//     limit = 10,
//     filters?: MedicineFilters
//   ): Promise<MedicineApiResponse> => {
//     const params = new URLSearchParams({
//       page: page.toString(),
//       limit: limit.toString(),
//     });

//     if (filters?.search) {
//       params.append("search", filters.search);
//     }
//     if (filters?.category) {
//       params.append("category", filters.category);
//     }
//     if (filters?.manufacturer) {
//       params.append("manufacturer", filters.manufacturer);
//     }
//     if (filters?.ageGroup) {
//       params.append("ageGroup", filters.ageGroup);
//     }

//     const response = await APIConfig.get(
//       `/api/medicine/admin?${params.toString()}`
//     );
//     return response.data;
//   },

//   // Get medicine by ID
//   getById: async (id: string): Promise<{ data: IMedicine }> => {
//     const response = await APIConfig.get(`/api/medicine/${id}`);
//     return response.data;
//   },

//   // Create new medicine
//   create: async (medicine: IMedicinePayload): Promise<{ data: IMedicine }> => {
//     const response = await APIConfig.post("/api/medicine", medicine);
//     return response.data;
//   },

//   // Update medicine
//   update: async (
//     id: string,
//     medicine: IMedicinePayload
//   ): Promise<{ data: IMedicine }> => {
//     const response = await APIConfig.put(`/api/medicine/${id}`, medicine);
//     return response.data;
//   },

//   // Delete medicine
//   delete: async (id: string): Promise<{ data: IMedicine }> => {
//     const response = await APIConfig.delete(`/api/medicine/${id}`);
//     return response.data;
//   },

//   // Upload single image
//   uploadImage: async (file: File): Promise<{ url: string }> => {
//     const formData = new FormData();
//     formData.append("image", file);

//     const response = await APIConfig.post("/api/upload/single", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return { url: response.data.data };
//   },

//   // Upload multiple images
//   uploadMultipleImages: async (files: File[]): Promise<{ urls: string[] }> => {
//     const formData = new FormData();
//     files.forEach((file) => {
//       formData.append("images", file);
//     });

//     const response = await APIConfig.post("/api/upload/multiple", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return { urls: response.data.data };
//   },
// };
//#endregion
//#region version 3
// import APIConfig from "@/api/api.config"
// import type { IMedicine, IMedicinePayload, MedicineApiResponse, MedicineFilters } from "@/interfaces/medicine.interface"

export const medicineApi = {
  getMedicines: async (
    page = 1,
    limit = 10,
    filters?: MedicineFilters
  ): Promise<MedicineApiResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters?.search) {
      params.append("search", filters.search);
    }
    if (filters?.category) {
      params.append("category", filters.category);
    }
    if (filters?.manufacturer) {
      params.append("manufacturer", filters.manufacturer);
    }
    if (filters?.ageGroup) {
      params.append("ageGroup", filters.ageGroup);
    }

    const response = await APIConfig.get(
      `/api/medicine/admin?${params.toString()}`
    );
    // console.log("API Response:", response.data.data.data);
    // return response.data.data.data;
    return response.data as MedicineApiResponse;
  },

  // Get single medicine by ID
  getMedicine: async (id: string): Promise<{ data: IMedicine }> => {
    const response = await APIConfig.get(`/api/medicine/${id}`);
    return response.data;
  },

  // Create new medicine
  createMedicine: async (
    data: IMedicinePayload
  ): Promise<{ data: IMedicine }> => {
    const response = await APIConfig.post("/api/medicine", data);
    return response.data;
  },

  // Update medicine
  updateMedicine: async (
    id: string,
    data: Partial<IMedicinePayload>
  ): Promise<{ data: IMedicine }> => {
    const response = await APIConfig.put(`/api/medicine/${id}`, data);
    console.log("Update Medicine Response:", response.data);
    return response.data;
  },

  // Delete medicine
  deleteMedicine: async (id: string): Promise<{ message: string }> => {
    const response = await APIConfig.delete(`/api/medicine/${id}`);
    return response.data;
  },

  // Upload single image
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await APIConfig.post("/api/upload/single", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { url: response.data.data };
  },

  // Upload multiple images
  uploadMultipleImages: async (files: File[]): Promise<{ urls: string[] }> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    const response = await APIConfig.post("/api/upload/multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { urls: response.data.data };
  },
};
