// "use client";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IMedicineUsageGroup } from "@/interface/medicine/usage.interface";

export const columns = (
  router: ReturnType<typeof useRouter>
): ColumnDef<IMedicineUsageGroup>[] => [
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
    cell: ({ row }) => {
      const icon = row.getValue("icon");
      const isValidIcon =
        typeof icon === "string" &&
        (icon.startsWith("http") || icon.startsWith("/"));

      return (
        <div className="flex justify-center">
          {isValidIcon ? (
            <Image src={icon} alt="icon" width={25} height={25} />
          ) : (
            <span className="text-gray-400 italic">No Icon</span>
          )}
        </div>
      );
    },
    // cell: ({ row }) => (
    //   <div className="flex justify-center">
    //     <Image src={row.getValue("icon")} alt="icon" width={25} height={25} />
    //   </div>
    // ),
  },
  {
    id: "activity",
    header: "Activity",
    cell: ({ row }) => (
      <div className="flex gap-2 justify-center">
        <button
          className="bg-green-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md transition"
          onClick={() => handleSubmit(row.original._id!, router)}
        >
          Chi tiết
        </button>
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md transition"
          onClick={() => handleEdit(row.original._id!, router)}
        >
          Cập nhật
        </button>
        <button
          className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md transition"
          onClick={() => handleDelete(row.original._id!)}
        >
          Xóa
        </button>
      </div>
    ),
    enableSorting: false,
  },
];
function handleSubmit(id: string, router: ReturnType<typeof useRouter>) {
  router.push(`/medicine-usage/${id}/detail`);
}
function handleEdit(id: string, router: ReturnType<typeof useRouter>) {
  router.push(`/medicine-usage/${id}/edit`);
}

function handleDelete(id: string) {
  // TODO: Thêm confirm hoặc toast
  console.log("Xóa item có ID:", id);
}
