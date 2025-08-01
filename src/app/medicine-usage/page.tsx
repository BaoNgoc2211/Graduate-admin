"use client";

import { MedicineUsageDeleteDialog } from "@/components/medicine/usage/medicine-usage-delete-dialog";
import { MedicineUsageModal } from "@/components/medicine/usage/medicine-usage-modal";
import { MedicineUsageStatus } from "@/components/medicine/usage/medicine-usage-status";
import { MedicineUSageTable } from "@/components/medicine/usage/medicine-usage-table";
import { IMedicineUsage } from "@/interface/medicine/usage.interface";
import { useState } from "react";

export default function MedicineUSagePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUsage, setSelectedUsage] = useState<IMedicineUsage | null>(
    null
  );
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const handleAdd = () => {
    setSelectedUsage(null);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleEdit = (usage: IMedicineUsage) => {
    setSelectedUsage(usage);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleDelete = (usage: IMedicineUsage) => {
    setSelectedUsage(usage);
    setIsDeleteDialogOpen(true);
  };

  const handleView = (usage: IMedicineUsage) => {
    setSelectedUsage(usage);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUsage(null);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedUsage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Quản lý nhóm thuốc
              </h1>
              <p className="text-gray-600 mt-2">
                Quản lý và phân loại các nhóm thuốc trong hệ thống
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <MedicineUsageStatus />

        {/* Main Content */}
        <div className="space-y-6">
          <MedicineUSageTable
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
          />
        </div>

        {/* Modals */}
        <MedicineUsageModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          usage={selectedUsage}
          mode={modalMode}
        />

        <MedicineUsageDeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          usage={selectedUsage}
        />
      </div>
    </div>
  );
}
