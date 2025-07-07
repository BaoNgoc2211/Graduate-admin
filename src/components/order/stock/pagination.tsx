"use client";
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  totalItems: number;
  itemsPerPage: number;
}> = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const pages = useMemo(() => {
    const arr: (number | "...")[] = [];
    const max = 5;
    if (totalPages <= max) {
      for (let i = 1; i <= totalPages; i++) arr.push(i);
    } else if (currentPage <= 3) {
      arr.push(1, 2, 3, 4, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      arr.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      arr.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
    return arr;
  }, [currentPage, totalPages]);

  return (
    <div className="flex flex-col items-center justify-between gap-4 px-2 sm:flex-row">
      <p className="text-sm text-gray-700">
        Hiển thị&nbsp;
        <span className="font-medium">{start}</span>–
        <span className="font-medium">{end}</span> trong&nbsp;
        <span className="font-medium">{totalItems}</span> kết quả
      </p>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </Button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 py-1 text-gray-500">
              ...
            </span>
          ) : (
            <Button
              key={i}
              size="sm"
              variant={p === currentPage ? "default" : "outline"}
              className={
                p === currentPage ? "bg-blue-900 hover:bg-blue-800" : ""
              }
              onClick={() => onPageChange(p)}
            >
              {p}
            </Button>
          )
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sau
        </Button>
      </div>
    </div>
  );
};
export default Pagination;
