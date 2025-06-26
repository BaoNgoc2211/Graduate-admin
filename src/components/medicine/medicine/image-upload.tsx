"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X, Upload, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { uploadToCloudinary, uploadMultipleToCloudinary, isValidImageFile, isValidFileSize } from "@/lib/cloudinary"
import Image from "next/image"

interface ImageUploadProps {
  label: string
  value: string | string[]
  onChange: (value: string | string[]) => void
  multiple?: boolean
  maxFiles?: number
  required?: boolean
  className?: string
}

export default function ImageUpload({
  label,
  value,
  onChange,
  multiple = false,
  maxFiles = 5,
  required = false,
  className = "",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const currentImages = multiple ? (Array.isArray(value) ? value : []) : value ? [value as string] : []

  // Xử lý chọn file
  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const fileArray = Array.from(files)

    // Kiểm tra định dạng và kích thước file
    for (const file of fileArray) {
      if (!isValidImageFile(file)) {
        toast.error(`File ${file.name} không đúng định dạng. Chỉ chấp nhận JPG, PNG, WebP.`)
        return
      }
      if (!isValidFileSize(file)) {
        toast.error(`File ${file.name} quá lớn. Kích thước tối đa 5MB.`)
        return
      }
    }

    // Kiểm tra số lượng file
    if (multiple) {
      const totalFiles = currentImages.length + fileArray.length
      if (totalFiles > maxFiles) {
        toast.error(`Chỉ được upload tối đa ${maxFiles} ảnh.`)
        return
      }
    } else if (fileArray.length > 1) {
      toast.error("Chỉ được chọn 1 ảnh.")
      return
    }

    setIsUploading(true)

    try {
      if (multiple) {
        // Upload nhiều ảnh
        const urls = await uploadMultipleToCloudinary(fileArray)
        const newImages = [...currentImages, ...urls]
        onChange(newImages)
        toast.success(`Upload thành công ${urls.length} ảnh!`)
      } else {
        // Upload 1 ảnh
        const url = await uploadToCloudinary(fileArray[0])
        onChange(url)
        toast.success("Upload ảnh thành công!")
      }
    } catch (error) {
      toast.error("Upload ảnh thất bại. Vui lòng thử lại.")
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  /**
   * Xử lý xóa ảnh
   */
  const handleRemoveImage = (index: number) => {
    if (multiple) {
      const newImages = currentImages.filter((_, i) => i !== index)
      onChange(newImages)
    } else {
      onChange("")
    }
  }

  /**
   * Xử lý drag & drop
   */
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
          ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
          ${isUploading ? "pointer-events-none opacity-50" : "cursor-pointer"}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-sm text-gray-600">Đang upload...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <div className="text-sm text-gray-600">
              <span className="font-medium text-blue-600">Nhấp để chọn ảnh</span> hoặc kéo thả vào đây
            </div>
            <p className="text-xs text-gray-500">
              {multiple ? `Tối đa ${maxFiles} ảnh` : "1 ảnh"} • JPG, PNG, WebP • Tối đa 5MB
            </p>
          </div>
        )}
      </div>

      {/* Image Preview */}
      {currentImages.length > 0 && (
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">Ảnh đã chọn:</Label>
          <div className={`grid gap-3 ${multiple ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"}`}>
            {currentImages.map((imageUrl, index) => (
              <div key={index} className="relative group">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                  width={300}
                  height={200}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveImage(index)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
