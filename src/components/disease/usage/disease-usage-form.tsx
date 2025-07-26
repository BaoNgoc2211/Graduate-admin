import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  uploadToCloudinary,
  isValidImageFile,
  isValidFileSize,
} from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { IDiseaseUsage } from "@/interface/disease/disease-usage.interface";
import {
  useCreateDiseaseUsageGroup,
  useUpdateDiseaseUsageGroup,
} from "@/hooks/disease/usage.hook";
import { diseaseUsageSchema } from "@/schema/disease/usage.schema";

interface DiseaseCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  usage?: IDiseaseUsage | null;
  mode: "create" | "edit";
}

export function DiseaseUsageForm({
  isOpen,
  onClose,
  usage,
  mode,
}: DiseaseCategoryFormProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createMutation = useCreateDiseaseUsageGroup();
  const updateMutation = useUpdateDiseaseUsageGroup();

  const isLoading = createMutation.isPending || updateMutation.isPending;

  // Reset form when dialog opens/closes or category changes
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && usage) {
        setName(usage.name);
        setIcon(usage.icon);
      } else {
        setName("");
        setIcon("");
      }
    }
  }, [isOpen, mode, usage]);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file
    if (!isValidImageFile(file)) {
      toast.error("Chỉ chấp nhận file ảnh (JPG, PNG, WebP)");
      return;
    }

    if (!isValidFileSize(file)) {
      toast.error("Kích thước file tối đa 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      setIcon(url);
      toast.success("Upload ảnh thành công!");
    } catch (error) {
      toast.error("Upload ảnh thất bại. Vui lòng thử lại.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: name.trim(),
      icon: icon.trim(),
    };

    const result = diseaseUsageSchema.safeParse(payload);

    if (!result.success) {
      const issues = result.error.format();
      if (issues.name?._errors?.[0]) {
        toast.error(issues.name._errors[0]);
      } else if (issues.icon?._errors?.[0]) {
        toast.error(issues.icon._errors[0]);
      }
      return;
    }

    if (mode === "create") {
      createMutation.mutate(result.data, {
        onSuccess: () => {
          onClose();
        },
      });
    } else if (mode === "edit" && usage?._id) {
      updateMutation.mutate(
        {
          id: usage._id,
          data: result.data,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };
 
  const handleRemoveIcon = () => {
    setIcon("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-blue-900">
            {mode === "create"
              ? "Thêm danh mục bệnh"
              : "Chỉnh sửa danh mục bệnh"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Tạo danh mục bệnh mới cho hệ thống"
              : "Cập nhật thông tin danh mục bệnh"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Tên danh mục <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên danh mục bệnh..."
              disabled={isLoading}
            />
          </div>

          {/* Icon Upload */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Icon danh mục <span className="text-red-500">*</span>
            </Label>

            {/* Upload Area */}
            <div
              className={`
                relative border-2 border-dashed rounded-lg p-4 text-center transition-colors
                ${
                  dragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }
                ${
                  isUploading
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
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
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                disabled={isUploading}
              />

              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                  <p className="text-sm text-gray-600">Đang upload...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-6 w-6 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-blue-600">
                      Nhấp để chọn ảnh
                    </span>{" "}
                    hoặc kéo thả vào đây
                  </div>
                  <p className="text-xs text-gray-500">
                    JPG, PNG, WebP • Tối đa 5MB
                  </p>
                </div>
              )}
            </div>

            {/* Icon Preview */}
            {icon && (
              <div className="flex items-center justify-center">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden border">
                    <Image
                      src={icon || "/placeholder.svg"}
                      alt="Icon preview"
                      className="w-full h-full object-cover"
                      width={20}
                      height={20}
                    />
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleRemoveIcon}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-900 hover:bg-blue-800"
            >
              {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {mode === "create" ? "Tạo danh mục" : "Cập nhật"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
