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
import { useMedicineCategories } from "@/hooks/medicine/category.hooks";
import { useRouter } from "next/navigation";
import { IMedicineCategory } from "@/interface/medicine/category.interface";

const TableMedicineCategory: React.FC<Partial<IMedicineCategory>> = ({
}) => {
  const router = useRouter();
  const { data, isError } = useMedicineCategories();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const formattedData = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  const table = useReactTable({
    data: formattedData,
    columns: columns(router), 
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isError)
    return (
      <div className="text-center text-red-500 py-5">
        Error fetching data. Please try again.
      </div>
    );

  return (
    <div>
      <TableHeaderActions table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.id === "select" ||
                      header.column.id === "icon" ||
                      header.column.id === "activity"
                        ? "text-center"
                        : "text-left"
                    }
                  >
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
            <TableDataRows
              table={table}
              columnsLength={table.getVisibleLeafColumns().length}
            />
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
    </div>
  );
};

export default TableMedicineCategory;
