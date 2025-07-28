"use client"

import { useState, useCallback, useMemo } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { X, Upload, ImageIcon } from "lucide-react"
import Image from "next/image"

interface MedicineImageUploadProps {
  label: string
  value: string | string[]
  onChange: (value: string | string[]) => void
  required?: boolean
  multiple?: boolean
  maxFiles?: number
}

export default function MedicineImageUpload({
  label,
  value,
  onChange,
  required = false,
  multiple = false,
  maxFiles = 5,
}: MedicineImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  // Convert value to array for consistent handling
  const images = useMemo(() => {
    return Array.isArray(value) ? value : value ? [value] : []
  }, [value])
  // const images = Array.isArray(value) ? value : value ? [value] : []

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      setUploading(true)
      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          // Simulate upload - replace with actual upload logic
          return new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.readAsDataURL(file)
          })
        })

        const uploadedUrls = await Promise.all(uploadPromises)

        if (multiple) {
          const newImages = [...images, ...uploadedUrls].slice(0, maxFiles)
          onChange(newImages)
        } else {
          onChange(uploadedUrls[0])
        }
      } catch (error) {
        console.error("Upload error:", error)
      } finally {
        setUploading(false)
      }
    },
    [images, multiple, maxFiles, onChange],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple,
    maxFiles: multiple ? maxFiles - images.length : 1,
    disabled: uploading || (!multiple && images.length > 0),
  })

  const removeImage = (index: number) => {
    if (multiple) {
      const newImages = images.filter((_, i) => i !== index)
      onChange(newImages)
    } else {
      onChange("")
    }
  }

  const canUploadMore = multiple ? images.length < maxFiles : images.length === 0

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      {/* Upload Area */}
      {canUploadMore && (
        <Card
          {...getRootProps()}
          className={`border-2 border-dashed cursor-pointer transition-colors ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <CardContent className="p-6 text-center">
            <input {...getInputProps()} />
            <div className="space-y-2">
              <Upload className="h-8 w-8 mx-auto text-gray-400" />
              <div className="text-sm text-gray-600">
                {isDragActive ? (
                  <p>Thả ảnh vào đây...</p>
                ) : (
                  <div>
                    <p>Kéo thả ảnh vào đây hoặc</p>
                    <Button type="button" variant="link" className="p-0 h-auto text-blue-600" disabled={uploading}>
                      chọn từ máy tính
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Hỗ trợ: JPG, PNG, WEBP (tối đa 5MB)
                {multiple && ` - Tối đa ${maxFiles} ảnh`}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Preview */}
      {images.length > 0 && (
        <div className={`grid gap-3 ${multiple ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"}`}>
          {images.map((imageUrl, index) => (
            <Card key={index} className="relative group">
              <CardContent className="p-2">
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  {imageUrl.startsWith("data:") || imageUrl.startsWith("http") ? (
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={`${label} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}

                  {/* Remove Button */}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Status */}
      {uploading && (
        <div className="text-center">
          <p className="text-sm text-blue-600">Đang tải ảnh lên...</p>
        </div>
      )}

      {/* Image Count Info */}
      {multiple && images.length > 0 && (
        <p className="text-xs text-gray-500 text-center">
          {images.length}/{maxFiles} ảnh
        </p>
      )}
    </div>
  )
}
