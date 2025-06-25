"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateDistributor } from "@/hooks/inventory/distributor.hooks";
import { IDistributor } from "@/interface/inventory/distributor.interface";
import DistributorFormUI from "./distributor-form-2";

export default function DistributorEditForm({
  defaultValue,
  onSuccess,
}: {
  defaultValue: IDistributor;
  onSuccess?: () => void;
}) {
  const form = useForm<Omit<IDistributor, "_id">>({
    defaultValues: {
      nameCo: defaultValue.nameCo,
      nameRep: defaultValue.nameRep,
      email: defaultValue.email,
      phone: defaultValue.phone,
      address: defaultValue.address,
      country: defaultValue.country,
    },
  });

  const updateMutation = useUpdateDistributor();
  const isLoading = updateMutation.isPending;

  const onSubmit = (data: Omit<IDistributor, "_id">) => {
    updateMutation.mutate(
      { id: defaultValue._id, data: { ...data, _id: defaultValue._id } },
      { onSuccess: () => onSuccess?.() }
    );
  };

  useEffect(() => {
    form.setFocus("nameCo");
  }, []);

  return (
    <DistributorFormUI
      title="Cập nhật nhà phân phối"
      form={form}
      onSubmit={onSubmit}
      onCancel={form.reset}
      isLoading={isLoading}
    />
  );
}

