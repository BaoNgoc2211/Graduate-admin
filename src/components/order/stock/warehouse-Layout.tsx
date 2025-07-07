"use client";

import Link from "next/link";
import { Package } from "lucide-react";

const WarehouseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen flex-col bg-white">
    {/* header */}
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Package className="h-8 w-8 text-blue-900" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Quản lý Kho</h1>
              <p className="text-sm text-gray-500">Hệ thống nhà thuốc thông minh</p>
            </div>
          </div>
          <nav className="hidden items-center space-x-6 md:flex">
            <Link href="/stock" className="font-medium text-blue-900">
              Tồn kho
            </Link>
            <Link href="/purchase" className="text-gray-600 hover:text-gray-900">
              Nhập hàng
            </Link>
            <Link href="/reports" className="text-gray-600 hover:text-gray-900">
              Báo cáo
            </Link>
          </nav>
        </div>
      </div>
    </header>

    {/* main */}
    <main className="flex-1">{children}</main>

    {/* footer */}
    <footer className="border-t border-gray-200 bg-gray-50 py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">
          © 2024 Smart Pharmacy System. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
);

export default WarehouseLayout;
