"use client";
import TableMedicineCategory from "@/components/medicine-category/table/medicine-category";
import Button from "@/components/ui/button-02";

const Page: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-5">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-semibold mb-2">Medicine Categories</h1>
        <Button name="Create Medicine Category" />
      </div>
      <TableMedicineCategory />
    </div>
  );
};

export default Page;
