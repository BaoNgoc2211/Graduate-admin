import { useState, useMemo } from "react";
import { IMedicine } from "@/interface/medicine/medicine.interface";

export function useMedicinePagination(medicines: IMedicine[], searchTerm: string) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        medicine.name?.toLowerCase().includes(searchLower) ||
        medicine.code?.toLowerCase().includes(searchLower) ||
        medicine.dosageForm?.toLowerCase().includes(searchLower)
      );
    });
  }, [medicines, searchTerm]);

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMedicines = filteredMedicines.slice(startIndex, startIndex + itemsPerPage);

  return {
    currentMedicines,
    totalPages,
    currentPage,
    setCurrentPage,
    startIndex,
    endIndex: startIndex + itemsPerPage,
    filteredCount: filteredMedicines.length,
  };
}