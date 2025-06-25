"use client";
import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCreateMedicine, useGetAllMedicine } from "@/hooks/medicine/medicine.hooks";
import FormLayout from "@/components/medicine/medicine/ui/form-layout";
import { Button } from "@/components/ui/button";

const CreateMedicinePage = () => {
  const router = useRouter();
  const { data: allMedicines } = useGetAllMedicine();
  const createMedicine = useCreateMedicine();

  const autoCode = useMemo(() => {
    const count = Array.isArray(allMedicines) ? allMedicines.length : allMedicines?.data?.length || 0;
    return `M${(count + 1).toString().padStart(3, "0")}`;
  }, [allMedicines]);

  const form = useForm<CreateMedicineSchema>({
    resolver: zodResolver(createMedicineSchema),
    defaultValues: {
      code: "",
      name: "",
      dosageForm: "",
      sellingPrice: "",
      packaging: {
        type: "Hộp",
        bigQty: "",
        bigUnit: "vỉ",
        smallQty: "",
        smallUnit: "viên",
      },
      medCategory_id: [],
      medUsage_id: [],
      manufacturer_id: "",
      stock_id: "",
      storage: "",
      age_group: [],
      use: "",
      dosage: "",
      indication: "",
      contraindication: "",
      adverse: "",
      precaution: "",
      drugInteractions: "",
      note: "",
      thumbnail: undefined,
      images: [],
    },
  });

  useEffect(() => {
    form.setValue("code", autoCode);
  }, [autoCode, form]);

  const onSubmit = async (data: CreateMedicineSchema) => {
    const formData = new FormData();
    formData.append("packaging", `${data.packaging.type} ${data.packaging.bigQty} ${data.packaging.bigUnit} x ${data.packaging.smallQty} ${data.packaging.smallUnit}`);

    if (data.thumbnail instanceof File) {
      formData.append("thumbnail", data.thumbnail);
    }
    data.images.forEach((file) => {
      formData.append("image", file);
    });

    Object.entries(data).forEach(([key, val]) => {
      if (["thumbnail", "images", "packaging"].includes(key)) return;
      if (Array.isArray(val)) val.forEach((v) => formData.append(key, v));
      else if (val) formData.append(key, val as string);
    });

    await createMedicine.mutateAsync(formData);
    router.push("/medicine");
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-md shadow border border-gray-200 p-8">
          <h2 className="text-xl font-bold text-[#00416A] mb-6">Create New Medicine</h2>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormLayout form={form} />
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={createMedicine.isPending}>
                {createMedicine.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMedicinePage;
export const dynamic = "force-dynamic"; // Ensure the page is always dynamic