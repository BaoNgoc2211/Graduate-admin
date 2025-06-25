"use client";
import { uploadToCloudinary } from "@/api/upload.api";
import { useCreateMedicineCategory } from "@/hooks/medicine/category.hooks";
import {
  toastImageRequired,
  toastCreateSuccess,
  toastCreateError,
} from "@/lib/toast.helper.lib";
import { useState } from "react";

const CreateMedicineCategoryPage = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { mutateAsync: createCategory, isPending } =
    useCreateMedicineCategory();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return toastImageRequired();

    try {
      const imageUrl = await uploadToCloudinary(file);
      await createCategory({ name, icon: imageUrl });
      toastCreateSuccess();

      setName("");
      setFile(null);
    } catch (error) {
      toastCreateError(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6"
    >
      <h1 className="text-2xl font-bold text-blue-900 text-center">
        Tạo Nhóm Thuốc
      </h1>

      <div>
        <label
          htmlFor="category-name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tên Nhóm Thuốc
        </label>
        <input
          id="category-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Nhập tên nhóm thuốc"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition duration-200"
        />
      </div>

      <div>
        <label
          htmlFor="category-icon"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Chọn Ảnh Đại Diện
        </label>
        <input
          id="category-icon"
          type="file"
          accept="image/*"
          required
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm file:cursor-pointer file:border-none file:mr-4 file:bg-blue-50 file:text-blue-700 file:rounded file:px-3 file:py-1 transition duration-200"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 transition duration-200"
      >
        {isPending ? "Đang tạo..." : "Tạo Nhóm Thuốc"}
      </button>
    </form>
  );
};

export default CreateMedicineCategoryPage;
