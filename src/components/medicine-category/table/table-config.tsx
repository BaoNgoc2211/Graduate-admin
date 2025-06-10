"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { IMedicineCategory } from "@/interface/medicine/medicine-category.interface";

export const columns: ColumnDef<IMedicineCategory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => (
      <div>
        <img src={row.getValue("icon")} alt="icon" width={24} height={24} />
      </div>
    ),
  },
  {
    id: "activity",
    header: "Activity",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          className="text-blue-500 hover:underline"
          onClick={() => handleEdit(row.original.id)}
        >
          Edit
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(row.original.id)}
        >
          Delete
        </button>
      </div>
    ),
    enableSorting: false,
  },
];
function handleEdit(id: string) {
  console.log("Edit item with id:", id);
  // Thêm logic mở modal hoặc điều hướng
}

function handleDelete(id: string) {
  console.log("Delete item with id:", id);
  // Thêm logic xác nhận xóa
}
