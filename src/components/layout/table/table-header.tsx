import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const HeaderTable = () => {
  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px] px-4 py-2 text-left">
              Code
            </TableHead>
            <TableHead className="w-[250px] px-4 py-2 text-left">
              Name
            </TableHead>
            <TableHead className="w-[200px] px-4 py-2 text-left">
              DosageForm
            </TableHead>
            <TableHead className="w-[100px] px-4 py-2 text-center">
              Quantity
            </TableHead>
            <TableHead className="w-[120px] px-4 py-2 text-center">
              Selling Price
            </TableHead>
            <TableHead className="w-[180px] px-4 py-2 text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
};
export default HeaderTable;
