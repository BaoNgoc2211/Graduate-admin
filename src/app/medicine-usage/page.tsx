"use client";
import TableMedicineUsage from "@/components/medicine/usage/table/usage-group";
import Button from "@/components/ui/button-02";
const Page: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-2xl font-semibold">Medicine Categories</h1>
        <Button name="Create Medicine Category" />
      </div>
      <TableMedicineUsage />
    </div>
  );
};
export default Page;
