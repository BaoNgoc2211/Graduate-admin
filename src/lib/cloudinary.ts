import APIConfig from "@/api/api.config"

/**
 * Upload một ảnh lên server
 */
export const uploadToCloudinary = async (file: File): Promise<string> => {
  try {
    const formData = new FormData()
    formData.append("image", file)

    const res = await APIConfig.post("/api/upload/single", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (!res.data || !res.data.data) {
      throw new Error("Upload failed")
    }

    return res.data.data as string
  } catch (error) {
    console.error("Error uploading file:", error)
    throw error
  }
}

/**
 * Upload nhiều ảnh lên server
 */
export const uploadMultipleToCloudinary = async (files: File[]): Promise<string[]> => {
  try {
    const formData = new FormData()

    // Append tất cả files với cùng field name "images"
    files.forEach((file) => {
      formData.append("images", file)
    })

    const res = await APIConfig.post("/api/upload/multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (!res.data || !res.data.data) {
      throw new Error("Upload failed")
    }

    return res.data.data as string[]
  } catch (error) {
    console.error("Error uploading multiple files:", error)
    throw error
  }
}

/**
 * Kiểm tra định dạng file ảnh
 */
export const isValidImageFile = (file: File): boolean => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  return validTypes.includes(file.type)
}

/**
 * Kiểm tra kích thước file (tối đa 5MB)
 */
export const isValidFileSize = (file: File, maxSizeMB = 5): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}
