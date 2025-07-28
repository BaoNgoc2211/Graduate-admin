// export const WarehouseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
//   <div className="min-h-screen flex flex-col bg-white">
//     <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Package className="h-8 w-8 text-blue-900" />
//             <div>
//               <h1 className="text-xl font-semibold text-gray-900">Quản lý Kho</h1>
//               <p className="text-sm text-gray-500">Hệ thống nhà thuốc thông minh</p>
//             </div>
//           </div>
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link href="/stock" className="text-blue-900 font-medium">Tồn kho</Link>
//             <Link href="/purchase" className="text-gray-600 hover:text-gray-900">Nhập hàng</Link>
//             <Link href="/reports" className="text-gray-600 hover:text-gray-900">Báo cáo</Link>
//           </nav>
//         </div>
//       </div>
//     </header>
//     <main className="flex-1">{children}</main>
//     <footer className="border-t border-gray-200 bg-gray-50 py-8">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <p className="text-center text-sm text-gray-500">© 2024 Smart Pharmacy System. All rights reserved.</p>
//       </div>
//     </footer>
//   </div>
// );
"use client";

import React from "react"; // ✅ FIX: Add React import
import Link from "next/link"; // ✅ FIX: Add Link import
import { Package } from "lucide-react"; // ✅ FIX: Add Package import

// ✅ FIX: Add proper interface for props
interface WarehouseLayoutProps {
  children: React.ReactNode;
}

const WarehouseLayout: React.FC<WarehouseLayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-white">
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Package className="h-8 w-8 text-blue-900" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Quản lý Kho</h1>
              <p className="text-sm text-gray-500">Hệ thống nhà thuốc thông minh</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/stock" className="text-blue-900 font-medium">Tồn kho</Link>
            <Link href="/purchase" className="text-gray-600 hover:text-gray-900">Nhập hàng</Link>
            <Link href="/reports" className="text-gray-600 hover:text-gray-900">Báo cáo</Link>
          </nav>
        </div>
      </div>
    </header>
    <main className="flex-1">{children}</main>
    <footer className="border-t border-gray-200 bg-gray-50 py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">© 2024 Smart Pharmacy System. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

// ✅ FIX: Add default export
export default WarehouseLayout;