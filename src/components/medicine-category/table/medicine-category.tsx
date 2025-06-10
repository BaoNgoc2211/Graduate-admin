"use client";
import React, { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  flexRender,
} from "@tanstack/react-table";
// import { columns, Payment, data } from "./table-config";
import { columns } from "./table-config";
import TableHeaderActions from "./header-action";
import TableDataRows from "./data-row";
import TablePagination from "./pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getALLMedCategoryAPI } from "@/api/medicine/medicine-category.api";
import { useQuery } from "@tanstack/react-query";
import { IMedicineCategory } from "@/interface/medicine/medicine-category.interface";

const TableMedicineCategory: React.FC = () => {
  // State cho Table
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-latest-collection"],
    queryFn: () => getALLMedCategoryAPI(),
  });

  console.log("Data", data);

  const formattedData = useMemo(() => {
    if (!data?.data) return [];
    return data.data.map((item: IMedicineCategory) => ({
      id: item._id,
      name: item.name,
      icon: item.icon,
    }));
  }, [data]);
  const table = useReactTable({
    data: formattedData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  if (isLoading) return "isLoading...";
  if (isError) return "Fetching data error";
  return (
    <div className="">
      <TableHeaderActions table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <TableDataRows table={table} columnsLength={columns.length} />
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
    </div>
  );
};

export default TableMedicineCategory;
