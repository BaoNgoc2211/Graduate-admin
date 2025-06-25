"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useCreateDistributor } from "@/hooks/inventory/distributor.hooks";
import { IDistributor } from "@/interface/inventory/distributor.interface";
import DistributorFormUI from "./distributor-form-2";

export default function DistributorCreateForm({
  onSuccess,
}: {
  onSuccess?: () => void;
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

  useEffect(() => {
    form.setFocus("nameCo");
  }, []);

  return (
    <DistributorFormUI
      title="Thêm mới nhà phân phối"
      form={form}
      onSubmit={onSubmit}
      onCancel={form.reset}
      isLoading={isLoading}
    />
  );
}
