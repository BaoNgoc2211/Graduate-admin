// 📁 components/medicine/FormLayout.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MultiSelectCombobox } from "@/components/medicine/medicine/ui/multi-select-comobox";
import { PackagingInput } from "@/components/medicine/medicine/ui/packaging-input";
// import { RichTextEditor } from '@/components/medicine/medicine/ui/rich-text-editor';
import { Textarea } from "@/components/ui/textarea";
import {
  AGE_GROUP_OPTIONS,
  CATEGORY_OPTIONS,
  DOSAGE_FORM_OPTIONS,
  MANUFACTURER_OPTIONS,
  STOCK_OPTIONS,
  USAGE_OPTIONS,
  MAX_IMAGES,
} from "@/constants/medicine";

interface FormLayoutProps {
  form: any;
  packaging: any;
  setForm: any;
  setPackaging: any;
  handleChange: (field: string, value: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  thumbnailFile: File | null;
  setThumbnailFile: (file: File | null) => void;
  thumbnailPreview: string;
  setThumbnailPreview: (url: string) => void;
  imageFiles: File[];
  setImageFiles: (files: File[]) => void;
  imagePreviews: string[];
  setImagePreviews: (urls: string[]) => void;
  thumbnailInputRef: React.RefObject<HTMLInputElement>;
  imagesInputRef: React.RefObject<HTMLInputElement>;
}

const FormLayout: React.FC<FormLayoutProps> = ({
  form,
  packaging,
  setForm,
  setPackaging,
  handleChange,
  handleSubmit,
  thumbnailFile,
  setThumbnailFile,
  thumbnailPreview,
  setThumbnailPreview,
  imageFiles,
  setImageFiles,
  imagePreviews,
  setImagePreviews,
  thumbnailInputRef,
  imagesInputRef,
}) => {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-md shadow border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-[#00416A] mb-6">
            Create New Medicine
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4 text-sm"
          >
            <input type="text" value={form.code} readOnly className="hidden" />
            <div>
              <label className="block mb-1 font-medium">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2"
                required
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Dosage Form</label>
              <select
                className="w-full border rounded-md px-3 py-2"
                value={form.dosageForm}
                onChange={(e) => handleChange("dosageForm", e.target.value)}
              >
                <option value="">Select</option>
                {DOSAGE_FORM_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Selling Price</label>
              <input
                type="number"
                className="w-full border rounded-md px-3 py-2"
                min={0}
                value={form.sellingPrice}
                onChange={(e) => handleChange("sellingPrice", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Thumbnail</label>
              <input
                type="file"
                accept="image/*"
                ref={thumbnailInputRef}
                className="block"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setThumbnailFile(file);
                    const reader = new FileReader();
                    reader.onload = (ev) =>
                      setThumbnailPreview(ev.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview}
                  alt="preview"
                  className="mt-2 h-24 rounded"
                />
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                ref={imagesInputRef}
                className="block"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []).slice(
                    0,
                    MAX_IMAGES
                  );
                  setImageFiles(files);
                  const previews: string[] = [];
                  files.forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      previews.push(ev.target?.result as string);
                      if (previews.length === files.length)
                        setImagePreviews(previews);
                    };
                    reader.readAsDataURL(file);
                  });
                }}
              />
              <div className="flex gap-2 mt-2">
                {imagePreviews.map((src, i) => (
                  <img key={i} src={src} className="h-16 rounded border" />
                ))}
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium">Stock</label>
              <select
                className="w-full border rounded-md px-3 py-2"
                value={form.stock_id}
                onChange={(e) => handleChange("stock_id", e.target.value)}
              >
                <option value="">Select</option>
                {STOCK_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <MultiSelectCombobox
                label="Category"
                options={CATEGORY_OPTIONS}
                value={form.medCategory_id}
                onChange={(val) => handleChange("medCategory_id", val)}
              />
            </div>
            <div>
              <MultiSelectCombobox
                label="Usage"
                options={USAGE_OPTIONS}
                value={form.medUsage_id}
                onChange={(val) => handleChange("medUsage_id", val)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Manufacturer</label>
              <select
                className="w-full border rounded-md px-3 py-2"
                value={form.manufacturer_id}
                onChange={(e) =>
                  handleChange("manufacturer_id", e.target.value)
                }
              >
                <option value="">Select</option>
                {MANUFACTURER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <PackagingInput
                value={packaging}
                onChange={(val) => setPackaging(val)}
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Storage</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2"
                value={form.storage}
                onChange={(e) => handleChange("storage", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Age Group</label>
              <div className="flex flex-wrap gap-2">
                {AGE_GROUP_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      value={opt.value}
                      checked={form.age_group.includes(opt.value)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const next = checked
                          ? [...form.age_group, opt.value]
                          : form.age_group.filter(
                              (v: string) => v !== opt.value
                            );
                        handleChange("age_group", next);
                      }}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <Textarea
                value={form.use}
                onChange={(e) => handleChange("use", e.target.value)}
                placeholder="Cách dùng"
              />
            </div>
            <div className="md:col-span-2">
              <Textarea
                value={form.dosage}
                onChange={(e) => handleChange("dosage", e.target.value)}
                placeholder="Liều dùng"
              />
            </div>
            <div className="md:col-span-2">
              <Textarea
                value={form.note}
                onChange={(e) => handleChange("note", e.target.value)}
                placeholder="Ghi chú"
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => history.back()}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
