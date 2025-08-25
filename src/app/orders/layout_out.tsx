// import { Package } from "lucide-react"

// export default function AdminOrdersLoading() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-white border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-3">
//               <Package className="h-6 w-6 text-blue-900" />
//               <h1 className="text-xl font-semibold text-gray-900">Quản lý đơn hàng</h1>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex items-center justify-center py-12">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
//           <span className="ml-3 text-gray-600">Đang tải dữ liệu đơn hàng...</span>
//         </div>
//       </div>
//     </div>
//   )
// }
import Footer from "@/components/layout/footer";
import Sidebar from "@/components/layout/sidebar/sidebar";

const OrderPageLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
      {" "}
      <div className="flex min-h-screen">
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
        <main className="flex-1">
          <section className="w-full">{children}</section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPageLayout;
