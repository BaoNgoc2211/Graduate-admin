"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  uploadToCloudinary,
  isValidImageFile,
  isValidFileSize,
} from "@/lib/cloudinary";
import Image from "next/image";

interface UsageImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
  className?: string;
}

export function UsageImageUpload({
  value,
  onChange,
  disabled = false,
  className = "",
}: UsageImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!isValidImageFile(file)) {
      toast.error("Chỉ chấp nhận file ảnh (.jpg, .jpeg, .png, .webp)");
      return;
    }

    // Validate file size (2MB)
    if (!isValidFileSize(file, 2)) {
      toast.error("Kích thước file không được vượt quá 2MB");
      return;
    }

    try {
      setIsUploading(true);

      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Upload to Cloudinary
      const uploadedUrl = await uploadToCloudinary(file);

      // Update form value
      onChange(uploadedUrl);

      // Clean up preview URL and set uploaded URL
      URL.revokeObjectURL(previewUrl);
      setPreview(uploadedUrl);

      toast.success("Tải ảnh lên thành công!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Tải ảnh lên thất bại!");

      // Reset preview on error
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
      setPreview(value || null);
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Upload area */}
      <div className="space-y-3">
        {preview ? (
          // Image preview
          <div className="relative group">
            <div className="relative w-full h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 overflow-hidden">
              <Image
                src={preview || "/placeholder.svg"}
                alt="Usage preview"
                className="w-full h-full object-cover"
                width={1920}
                height={1080}
              />

              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleUploadClick}
                  disabled={disabled || isUploading}
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  {isUploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  Thay đổi
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemoveImage}
                  disabled={disabled || isUploading}
                >
                  <X className="h-4 w-4" />
                  Xóa
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Upload placeholder
          <div
            onClick={handleUploadClick}
            className={`
              w-full h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 
              flex flex-col items-center justify-center space-y-3 cursor-pointer
              hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              ${isUploading ? "pointer-events-none" : ""}
            `}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                <p className="text-sm text-gray-600">Đang tải ảnh lên...</p>
              </>
            ) : (
              <>
                <ImageIcon className="h-8 w-8 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">
                    Tải ảnh nhóm thuốc lên
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PNG, JPG, JPEG tối đa 2MB
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Upload button (alternative) */}
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={handleUploadClick}
            disabled={disabled || isUploading}
            className="w-full sm:w-auto bg-transparent"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang tải lên...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                {preview ? "Thay đổi ảnh" : "Chọn ảnh"}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Upload constraints info */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>• Chỉ chấp nhận file ảnh: .jpg, .jpeg, .png, .webp</p>
        <p>• Kích thước tối đa: 2MB</p>
        <p>• Khuyến nghị: Tỷ lệ vuông (1:1) để hiển thị tốt nhất</p>
      </div>
    </div>
  );
}
