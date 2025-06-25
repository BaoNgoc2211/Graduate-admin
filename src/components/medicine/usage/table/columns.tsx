
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { IMedicineCategory } from "@/interface/medicine/category.interface";
import Image from "next/image";

export const columns: ColumnDef<IMedicineCategory>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-left font-semibold">Name</div>,
    cell: ({ row }) => (
      <div className="text-left capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "icon",
    header: () => <div className="text-center font-semibold">Icon</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Image
          src={row.getValue("icon")}
          alt="icon"
          width={24}
          height={24}
          className="object-contain"
        />
      </div>
    ),
  },
  {
    id: "activity",
    header: () => <div className="text-center font-semibold">Activity</div>,
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <button
          className="text-blue-500 hover:underline text-sm"
          onClick={() => handleEdit(row.original._id!)}
        >
          Edit
        </button>
        <button
          className="text-red-500 hover:underline text-sm"
          onClick={() => handleDelete(row.original._id!)}
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
}

function handleDelete(id: string) {
  console.log("Delete item with id:", id);
}
