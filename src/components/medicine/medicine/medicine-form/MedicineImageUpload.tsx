/**
 * Component xử lý upload ảnh cho thuốc
 * Tách từ MedicineForm.tsx - phần upload thumbnail và multiple images
 */

"use client"
import { Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface MedicineImageUploadProps {
  thumbnail: string
  images: string[]
  onThumbnailUpload: (file: File) => Promise<void>
  onImageUpload: (file: File) => Promise<void>
  onThumbnailRemove: () => void
  onImageRemove: (index: number) => void
  isUploading: boolean
  isLoading: boolean
  thumbnailError?: string
}

export default function MedicineImageUpload({
  thumbnail,
  images,
  onThumbnailUpload,
  onImageUpload,
  onThumbnailRemove,
  onImageRemove,
  isUploading,
  isLoading,
  thumbnailError,
}: MedicineImageUploadProps) {
  return (
    <div className="space-y-6">
      {/* Thumbnail Upload */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">
          Ảnh đại diện <span className="text-red-500">*</span>
        </Label>
        <div className="flex items-center gap-4">
          {thumbnail && (
            <div className="relative">
              <img
                src={thumbnail || "/placeholder.svg"}
                alt="Thumbnail"
                className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                onClick={onThumbnailRemove}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onThumbnailUpload(file)
              }}
              className="hidden"
              id="thumbnail-upload"
              disabled={isLoading || isUploading}
            />
            <Label
              htmlFor="thumbnail-upload"
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-300 transition-colors"
            >
              {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
              {thumbnail ? "Thay đổi ảnh" : "Chọn ảnh đại diện"}
            </Label>
          </div>
        </div>
        {thumbnailError && <p className="text-sm text-red-600">{thumbnailError}</p>}
      </div>

      {/* Additional Images */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">Ảnh bổ sung (tối đa 5 ảnh)</Label>
        <div className="flex flex-wrap gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image || "/placeholder.svg"}
                alt={`Image ${index + 1}`}
                className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                onClick={() => onImageRemove(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}

          {images.length < 5 && (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) onImageUpload(file)
                }}
                className="hidden"
                id="images-upload"
                disabled={isLoading || isUploading}
              />
              <Label
                htmlFor="images-upload"
                className="cursor-pointer flex items-center justify-center w-20 h-20 bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 transition-colors"
              >
                {isUploading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                ) : (
                  <Upload className="h-6 w-6 text-gray-400" />
                )}
              </Label>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
