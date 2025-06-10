
"use client";

import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { flexRender, Table as ReactTable } from "@tanstack/react-table";
import { IMedicineCategory } from "@/interface/medicine/medicine-category.interface";

type Props = {
  table: ReactTable<IMedicineCategory>;
  columnsLength: number;
};

const TableDataRows: React.FC<Props> = ({ table, columnsLength }) => {
  const rows = table.getRowModel().rows;

  if (!rows.length) {
    return (
      <TableRow>
        <TableCell colSpan={columnsLength} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {rows.map((row) => (
        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableDataRows;
