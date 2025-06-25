import DistributorCreateForm from "@/components/inventory/distributor/form-create";
const CreatePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Tạo mới nhà phân phối</h1>
        <DistributorCreateForm />
      </div>
    </div>
  );
};
export default CreatePage;