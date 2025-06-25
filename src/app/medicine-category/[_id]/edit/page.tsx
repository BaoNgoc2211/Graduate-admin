"use client";
import { uploadToCloudinary } from "@/api/upload.api";
import {
  useMedicineCategoryById,
  useUpdateMedicineCategory,
} from "@/hooks/medicine/category.hooks";
import { toastUpdateError, toastUpdateSuccess } from "@/lib/toast.helper.lib";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateMedicineCategoryPage = () => {
  const { _id } = useParams<{ _id: string }>();
  const router = useRouter();
  const { data, isLoading, isError } = useMedicineCategoryById();
  const { mutateAsync: updateCategory, isPending } =
    useUpdateMedicineCategory();
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>("");

  useEffect(() => {
    if (data?.data) {
      setName(data.data.name);
      setIconPreview(data.data.icon);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let icon = iconPreview;
      if (file) {
        icon = await uploadToCloudinary(file);
      }
      await updateCategory({
        id: _id,
        data: {
          name,
          icon,
        },
      });
      toastUpdateSuccess();
      router.push("/medicine-category");
    } catch {
      toastUpdateError();
    }
  };

  if (isLoading) return <p className="text-center py-4">Đang tải dữ liệu...</p>;
  if (isError)
    return <p className="text-center text-red-500">Lỗi tải dữ liệu.</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto bg-white border border-blue-900 rounded-xl shadow-sm p-6 space-y-6"
    >
      <h1 className="text-2xl font-bold text-blue-900 text-center">
        Cập Nhật Nhóm Thuốc
      </h1>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tên Nhóm Thuốc
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Nhập tên nhóm thuốc"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ảnh đại diện (tuỳ chọn)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        {iconPreview && (
          <div className="flex justify-center">
            {" "}
            <Image
              src={iconPreview}
              alt="Preview"
              className="mt-2 w-28 h-28 object-cover rounded-md text-center border border-blue-900"
              width={150}
              height={150}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Đang cập nhật..." : "Cập Nhật"}
      </button>
    </form>
  );
};

export default UpdateMedicineCategoryPage;
