import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; //
import { useUpdateDistributor } from "@/hooks/inventory/distributor.hooks";
import { IDistributor } from "@/interface/inventory/distributor.interface";
import DistributorFormUI from "./distributor-form-2";
import {
  DistributorFormType,
  distributorSchema,
} from "@/schema/inventory/distributor.schema";

export default function DistributorEditForm({
  defaultValue,
  onSuccess,
  onCancel,
}: {
  defaultValue: IDistributor;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const form = useForm<DistributorFormType>({
    resolver: zodResolver(distributorSchema),
    defaultValues: {
      nameCo: defaultValue?.nameCo ?? "",
      nameRep: defaultValue?.nameRep ?? "",
      email: defaultValue?.email ?? "",
      phone: defaultValue?.phone ?? "",
      address: defaultValue?.address ?? "",
      country: defaultValue?.country ?? "",
    },
  });

  const updateMutation = useUpdateDistributor();
  const isLoading = updateMutation.isPending;

  const onSubmit = (data: DistributorFormType) => {
    updateMutation.mutate(
      { id: defaultValue._id!, data },
      {
        onSuccess: () => onSuccess?.(),
      }
    );
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
      title="Cập nhật nhà phân phối"
      form={form}
      onSubmit={onSubmit}
      onCancel={handleCancel}
      isLoading={isLoading}
    />
  );
}
