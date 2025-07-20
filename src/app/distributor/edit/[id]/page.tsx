"use client";
import DistributorEditForm from "@/components/inventory/distributor/form-edit";
import { useDistributorById } from "@/hooks/inventory/distributor.hooks";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
const EditDistributorPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading, isError } = useDistributorById(id as string);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading distributor data.</div>;
  if (!data) return <div>No distributor found.</div>;
  return (
    <>
      <DistributorEditForm
        defaultValue={data?.data}
        onSuccess={() => {
          toast.success("Cập nhật nhà phân phối thành công!");
          router.push("/distributor");
        }}
      />
    </>
  );
};
export default EditDistributorPage;
