"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Table as ReactTable } from "@tanstack/react-table";
import { IMedicineCategory } from "@/interface/medicine/category.interface";

type Props = {
  table: ReactTable<IMedicineCategory>;
};

const TablePagination: React.FC<Props> = ({ table }) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
