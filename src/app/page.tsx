"use client";
import { getALLMedicineAPI } from "@/api/medicine/medicine.api";
import SearchBar from "@/components/ui/search-bar-edit";
import MedicineTable from "@/components/layout/table/medicine-table";
import HeaderTable from "@/components/layout/table/table-header";
import Button from "@/components/ui/button-03";
import { IMedicine } from "@/interface/medicine/medicine.interface";
import { useQuery } from "@tanstack/react-query";
import Form from "@/components/medicine-category/form/form-create";
import FormUpdate from "@/components/medicine-category/form/form-update";
import Add from "@/components/medicine/form/form-create";

const HomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-latest-collection"],
    queryFn: () => getALLMedicineAPI(),
  });

  console.log("Data", data);

  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";
  const medicines: IMedicine[] =
    data?.data?.map((item: any) => ({
      code: item.code,
      name: item.name,
      quantity: item.stock_id?.quantity ?? 0,
      sellingPrice: item.stock_id?.sellingPrice ?? 0,
    })) ?? [];
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div></div>
        <div className="flex flex-row">
          <div className="mr-2">
            <SearchBar />
          </div>
          <div>
            {" "}
            <Button name="Thêm sản phẩm mới" />
          </div>
        </div>
      </div>
      <div className="bg-white overflow-x-auto w-full">
        <HeaderTable />
        {medicines.map((item: IMedicine, index: number) => (
          <MedicineTable
            key={index}
            code={item.code}
            name={item.name}
            dosageForm={item.dosageForm}
            quantity={item.quantity}
            sellingPrice={item.sellingPrice}
          />
        ))}
      </div>
      <Form />
      <FormUpdate/>
      <Add/>
    </div>
  );
};
export default HomePage;
