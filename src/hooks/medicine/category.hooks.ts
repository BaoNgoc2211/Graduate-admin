import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
  getAllMedicineCategoryAPI,
  getMedicineCategoryByIdAPI,
  createMedicineCategoryAPI,
  updateMedicineCategoryAPI,
  deleteMedicineCategoryAPI,
  getMedicineCategoryStatsAPI,
} from "@/api/medicine/category.api"
import type { IMedicineCategoryPayload, IMedicineCategoryFilter } from "@/interface/medicine/category.interface"

export const useMedicineCategories = (filter?: IMedicineCategoryFilter) => {
  return useQuery({
    queryKey: ["medicine-categories", filter],
    queryFn: getAllMedicineCategoryAPI,
  })
}

export const useMedicineCategoryById = (id: string) => {
  return useQuery({
    queryKey: ["medicine-category", id],
    queryFn: () => getMedicineCategoryByIdAPI(id),
    enabled: !!id,
  })
}

export const useCreateMedicineCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMedicineCategoryAPI,
    onSuccess: () => {
      toast.success("Tạo danh mục thuốc thành công!")
      queryClient.invalidateQueries({ queryKey: ["medicine-categories"] })
      queryClient.invalidateQueries({ queryKey: ["medicine-category-stats"] })
    },
    onError: (error) => {
      console.error("Lỗi tạo danh mục thuốc:", error)
      toast.error("Tạo danh mục thuốc thất bại!")
    },
  })
}

export const useUpdateMedicineCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: IMedicineCategoryPayload }) => updateMedicineCategoryAPI(id, data),
    onSuccess: (_, { id }) => {
      toast.success("Cập nhật danh mục thuốc thành công!")
      queryClient.invalidateQueries({ queryKey: ["medicine-categories"] })
      queryClient.invalidateQueries({ queryKey: ["medicine-category", id] })
      queryClient.invalidateQueries({ queryKey: ["medicine-category-stats"] })

    },
    onError: (error) => {
      console.error("Lỗi cập nhật danh mục thuốc:", error)
      toast.error("Cập nhật danh mục thuốc thất bại!")
    },
  })
}

export const useDeleteMedicineCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteMedicineCategoryAPI,
    onSuccess: () => {
      toast.success("Xóa danh mục thuốc thành công!")
      queryClient.invalidateQueries({ queryKey: ["medicine-categories"] })
      queryClient.invalidateQueries({ queryKey: ["medicine-category-stats"] })
    },
    onError: (error) => {
      console.error("Lỗi xóa danh mục thuốc:", error)
      toast.error("Xóa danh mục thuốc thất bại!")
    },
  })
}

// Hook lấy thống kê danh mục thuốc
export const useMedicineCategoryStats = () => {
  return useQuery({
    queryKey: ["medicine-category-stats"],
    queryFn: getMedicineCategoryStatsAPI,
  })
}

// Hook tổng hợp cho quản lý danh mục thuốc
export const useMedicineCategory = () => {
  const queryClient = useQueryClient()

  const getAll = useQuery({
    queryKey: ["medicine-categories"],
    queryFn: getAllMedicineCategoryAPI,
  })

  const create = useMutation({
    mutationFn: createMedicineCategoryAPI,
    onSuccess: () => {
      toast.success("Tạo danh mục thuốc thành công!")
      queryClient.invalidateQueries({ queryKey: ["medicine-categories"] })
    },
    onError: () => {
      toast.error("Tạo danh mục thuốc thất bại!")
    },
  })

  const update = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: IMedicineCategoryPayload
    }) => updateMedicineCategoryAPI(id, payload),
    onSuccess: () => {
      toast.success("Cập nhật danh mục thuốc thành công!")
      queryClient.invalidateQueries({ queryKey: ["medicine-categories"] })
    },
    onError: () => {
      toast.error("Cập nhật danh mục thuốc thất bại!")
    },
  })

  const remove = useMutation({
    mutationFn: deleteMedicineCategoryAPI,
    onSuccess: () => {
      toast.success("Xóa danh mục thuốc thành công!")
      queryClient.invalidateQueries({ queryKey: ["medicine-categories"] })
    },
    onError: () => {
      toast.error("Xóa danh mục thuốc thất bại!")
    },
  })

  return { getAll, create, update, remove }
}
