"use client"

import { useState } from "react"
import type { IMedicineCategory } from "@/interface/medicine/category.interface"
import { MedicineCategoryStats } from "@/components/medicine/category/medicine-category-status"
import { MedicineCategoryTable } from "@/components/medicine/category/medicine-category-table"
import { MedicineCategoryModal } from "@/components/medicine/category/medicine-category-modal"
import { MedicineCategoryDeleteDialog } from "@/components/medicine/category/medicine-category-delete-dialog"

export default function MedicineCategoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<IMedicineCategory | null>(null)
  const [modalMode, setModalMode] = useState<"create" | "edit">("create")

  const handleAdd = () => {
    setSelectedCategory(null)
    setModalMode("create")
    setIsModalOpen(true)
  }

  const handleEdit = (category: IMedicineCategory) => {
    setSelectedCategory(category)
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const handleDelete = (category: IMedicineCategory) => {
    setSelectedCategory(category)
    setIsDeleteDialogOpen(true)
  }

  const handleView = (category: IMedicineCategory) => {
    setSelectedCategory(category)
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCategory(null)
  }

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false)
    setSelectedCategory(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Quản lý danh mục thuốc</h1>
              <p className="text-gray-600 mt-2">Quản lý và phân loại các danh mục thuốc trong hệ thống</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <MedicineCategoryStats />

        {/* Main Content */}
        <div className="space-y-6">
          <MedicineCategoryTable onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
        </div>

        {/* Modals */}
        <MedicineCategoryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          category={selectedCategory}
          mode={modalMode}
        />

        <MedicineCategoryDeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          category={selectedCategory}
        />
      </div>
    </div>
  )
}
