"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCreateDistributor } from "@/hooks/inventory/distributor.hooks";
import { IDistributor } from "@/interface/inventory/distributor.interface";
import DistributorFormUI from "./distributor-form-2";

export default function DistributorCreateForm({
  onSuccess,
  onCancel,
}: {
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const form = useForm<Omit<IDistributor, "_id">>({
    defaultValues: {
      nameCo: "",
      nameRep: "",
      email: "",
      phone: "",
      address: "",
      country: "",
    },
  });

  const createMutation = useCreateDistributor();
  const isLoading = createMutation.isPending;

  const onSubmit = (data: Omit<IDistributor, "_id">) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  const handleCancel = () => {
    form.reset();
    onCancel?.();
  };

  useEffect(() => {
    form.setFocus("nameCo");
  }, [form]);

  return (
    <DistributorFormUI
      title="Thêm mới nhà phân phối"
      form={form}
      onSubmit={onSubmit}
      onCancel={handleCancel}
      isLoading={isLoading}
    />
  );
}
