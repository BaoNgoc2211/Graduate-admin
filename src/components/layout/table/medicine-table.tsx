import Button from "@/components/ui/button-02";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { IMedicine } from "@/interface/medicine/medicine.interface";
const MedicineTable = (props: IMedicine) => {
  return (
    <div>
      {" "}
      <Table className="justify-between">
        <TableBody className="table-fixed w-full">
          <TableRow className="h-[50px] text-sm">
            <TableCell className="w-[140px] max-w-[200px] px-4 py-3 font-medium truncate">
              {props.code}
            </TableCell>
            <TableCell className="w-[250px] max-w-[250px] px-4 py-3 font-medium truncate">
              {props.name}
            </TableCell>
            <TableCell className="w-[250px] max-w-[250px] px-4 py-3 font-medium truncate">
              {props.dosageForm}
            </TableCell>
            {/* <TableCell className="w-[100px] max-w-[150px] px-4 py-3 font-medium text-center">
              {props.quantity}
            </TableCell>
            <TableCell className="w-[120px] max-w-[150px] px-4 py-3 font-medium text-center">
              {props.sellingPrice}
            </TableCell> */}
            <TableCell className="w-[180px] max-w-[200px] px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-2 flex-wrap sm:flex-nowrap">
                <Button name="Chi tiết" />
                <Button name="Xóa" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
export default MedicineTable;
