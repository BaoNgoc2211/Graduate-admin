// import type { IRevenueStats, IOrder, IOrderItem } from "@/interface/order/order.interface"
// import { fetchAllOrders } from "./order.api"

// /**
//  * Tính toán thống kê doanh thu từ dữ liệu đơn hàng thật
//  */
// export const fetchRevenueStats = async (period: "day" | "week" | "month" = "day"): Promise<IRevenueStats> => {
//   try {
//     console.log("Fetching revenue stats for period:", period)

//     // Lấy tất cả đơn hàng từ API thật
//     const orders = await fetchAllOrders()
//     console.log("Fetched orders for revenue calculation:", orders.length)

//     // Lọc đơn hàng hoàn thành để tính doanh thu
//     const completedOrders = orders.filter((order) => order.status === "Hoàn thành")
//     console.log("Completed orders:", completedOrders.length)

//     // Tính tổng doanh thu và số đơn hàng
//     const totalRevenue = completedOrders.reduce((sum, order) => sum + order.finalAmount, 0)
//     const totalOrders = completedOrders.length
//     const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

//     // Mock growth data (có thể thay thế bằng logic so sánh với kỳ trước)
//     const revenueGrowth = 12.5
//     const ordersGrowth = 8.3

//     // Tạo dữ liệu theo thời gian
//     const timeData = generateTimeSeriesData(completedOrders, period)

//     // Tính top products từ order items
//     const topProducts = calculateTopProducts(completedOrders)

//     // Tính phân bố trạng thái
//     const statusDistribution = calculateStatusDistribution(orders)

//     const stats: IRevenueStats = {
//       totalRevenue,
//       totalOrders,
//       averageOrderValue,
//       revenueGrowth,
//       ordersGrowth,
//       dailyRevenue: period === "day" ? timeData : [],
//       weeklyRevenue: period === "week" ? timeData : [],
//       monthlyRevenue: period === "month" ? timeData : [],
//       topProducts,
//       statusDistribution,
//     }

//     console.log("Calculated revenue stats:", stats)
//     return stats
//   } catch (error) {
//     console.error("Error fetching revenue stats:", error)
//     throw error
//   }
// }

// // Interface cho dữ liệu time series
// interface TimeSeriesData {
//   date?: string
//   week?: string
//   month?: string
//   revenue: number
//   orders: number
// }

// // Tạo dữ liệu time series từ đơn hàng thật
// function generateTimeSeriesData(orders: IOrder[], period: "day" | "week" | "month"): TimeSeriesData[] {
//   const now = new Date()
//   const data: TimeSeriesData[] = []

//   if (period === "day") {
//     // 7 ngày gần nhất
//     for (let i = 6; i >= 0; i--) {
//       const date = new Date(now)
//       date.setDate(date.getDate() - i)
//       const dateStr = date.toISOString().split("T")[0]

//       const dayOrders = orders.filter((order) => {
//         const orderDate = new Date(order.orderDate).toISOString().split("T")[0]
//         return orderDate === dateStr
//       })

//       data.push({
//         date: dateStr,
//         revenue: dayOrders.reduce((sum, order) => sum + order.finalAmount, 0),
//         orders: dayOrders.length,
//       })
//     }
//   } else if (period === "week") {
//     // 4 tuần gần nhất
//     for (let i = 3; i >= 0; i--) {
//       const weekStart = new Date(now)
//       weekStart.setDate(weekStart.getDate() - i * 7 - weekStart.getDay())
//       const weekEnd = new Date(weekStart)
//       weekEnd.setDate(weekEnd.getDate() + 6)

//       const weekOrders = orders.filter((order) => {
//         const orderDate = new Date(order.orderDate)
//         return orderDate >= weekStart && orderDate <= weekEnd
//       })

//       data.push({
//         week: `Tuần ${4 - i}`,
//         revenue: weekOrders.reduce((sum, order) => sum + order.finalAmount, 0),
//         orders: weekOrders.length,
//       })
//     }
//   } else if (period === "month") {
//     // 6 tháng gần nhất
//     for (let i = 5; i >= 0; i--) {
//       const monthDate = new Date(now)
//       monthDate.setMonth(monthDate.getMonth() - i)
//       const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
//       const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0)

//       const monthOrders = orders.filter((order) => {
//         const orderDate = new Date(order.orderDate)
//         return orderDate >= monthStart && orderDate <= monthEnd
//       })

//       data.push({
//         month: monthDate.toLocaleDateString("vi-VN", { month: "long", year: "numeric" }),
//         revenue: monthOrders.reduce((sum, order) => sum + order.finalAmount, 0),
//         orders: monthOrders.length,
//       })
//     }
//   }

//   return data
// }

// // Interface cho top product stats
// interface TopProductStats {
//   _id: string
//   name: string
//   code: string
//   thumbnail: string
//   totalSold: number
//   revenue: number
// }

// // Tính top products từ order items thật
// function calculateTopProducts(orders: IOrder[]): TopProductStats[] {
//   const productStats: Record<string, TopProductStats> = {}

//   // Tổng hợp dữ liệu từ tất cả order items
//   orders.forEach((order) => {
//     order.orderItems?.forEach((item: IOrderItem) => {
//       const productId = item.medicine_id._id

//       if (!productStats[productId]) {
//         productStats[productId] = {
//           _id: productId,
//           name: item.medicine_id.name,
//           code: item.medicine_id.code,
//           thumbnail: item.medicine_id.thumbnail,
//           totalSold: 0,
//           revenue: 0,
//         }
//       }

//       productStats[productId].totalSold += item.quantity
//       productStats[productId].revenue += item.totalAmount
//     })
//   })

//   // Sắp xếp theo doanh thu và lấy top 5
//   return Object.values(productStats)
//     .sort((a, b) => b.revenue - a.revenue)
//     .slice(0, 5)
// }

// // Interface cho status distribution
// interface StatusDistribution {
//   status: string
//   count: number
//   percentage: number
// }

// // Tính phân bố trạng thái từ đơn hàng thật
// function calculateStatusDistribution(orders: IOrder[]): StatusDistribution[] {
//   const statusCount: Record<string, number> = {}
//   const total = orders.length

//   // Đếm số lượng theo từng trạng thái
//   orders.forEach((order) => {
//     const status = order.status
//     statusCount[status] = (statusCount[status] || 0) + 1
//   })

//   // Chuyển đổi thành format cần thiết
//   return Object.entries(statusCount).map(([status, count]) => ({
//     status,
//     count,
//     percentage: total > 0 ? Math.round((count / total) * 100 * 10) / 10 : 0,
//   }))
// }
import { IRevenueStats } from "@/interface/order/order.interface";
import APIConfig from "../api.config";

interface ProductData {
  _id: string;
  name: string;
  code: string;
  thumbnail: string;
  totalSold: number;
  revenue: number;
}

interface StatusData {
  status: string;
  count: number;
  percentage: number;
}
export const fetchRevenueStats = async (period: "day" | "week" | "month" = "day"): Promise<IRevenueStats> => {
  try {
    const res = await APIConfig.get(`/api/revenue/stats?period=${period}`);
    const data = res.data.data || res.data;

    const {
      totalRevenue = 0,
      totalOrders = 0,
      averageOrderValue = 0,
      revenueGrowth = 0,
      ordersGrowth = 0,
      topProducts = [],
      statusDistribution = [],
      dailyRevenue = [],
      weeklyRevenue = [],
      monthlyRevenue = [],
    } = data;

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      revenueGrowth,
      ordersGrowth,
      dailyRevenue,
      weeklyRevenue,
      monthlyRevenue,
      topProducts: (topProducts as ProductData[]).map((product) => ({
        _id: product._id || "",
        name: product.name || "Unknown Product",
        code: product.code || "",
        thumbnail: product.thumbnail || "",
        totalSold: product.totalSold || 0,
        revenue: product.revenue || 0,
      })),
      statusDistribution: (statusDistribution as StatusData[]).map((status) => ({
        status: status.status || "Unknown",
        count: status.count || 0,
        percentage: status.percentage || 0,
      })),
    };
  } catch (error) {
    console.error("Error fetching revenue stats:", error);
    return generateMockRevenueStats();
  }
};
// export const fetchRevenueStats = async (): Promise<IRevenueStats> => {
//   try {
//     const res = await APIConfig.get(`/api/revenue/stats`);
//     const data = res.data.data || res.data;

//     // ✅ Extract data với safe fallbacks
//     const {
//       totalRevenue = 0,
//       totalOrders = 0,
//       averageOrderValue = 0,
//       revenueGrowth = 0,
//       ordersGrowth = 0,
//       topProducts = [],
//       statusDistribution = [],
//     } = data;

//     return {
      
//       totalRevenue,
//       totalOrders,
//       averageOrderValue,
//       revenueGrowth,
//       ordersGrowth,
//       topProducts: (topProducts as ProductData[]).map((product) => ({
//         _id: product._id || "",
//         name: product.name || "Unknown Product",
//         code: product.code || "",
//         thumbnail: product.thumbnail || "",
//         totalSold: product.totalSold || 0,
//         revenue: product.revenue || 0,
//       })),
//       statusDistribution: (statusDistribution as StatusData[]).map((status) => ({
//         status: status.status || "Unknown",
//         count: status.count || 0,
//         percentage: status.percentage || 0,
//       })),
//     };
//   } catch (error) {
//     console.error("Error fetching revenue stats:", error);
    
//     // ✅ Fallback: return mock data structure
//     return generateMockRevenueStats();
//   }
// };

// ✅ Đơn giản hóa mock data - bỏ time series
// export const generateMockRevenueStats = (): IRevenueStats => {
//   return {
//     totalRevenue: 15000000, // 15M VND
//     totalOrders: 450,
//     averageOrderValue: 333333, // ~333k VND
//     revenueGrowth: 12.5,
//     ordersGrowth: 8.3,
//     topProducts: [
//       {
//         _id: "1",
//         name: "Paracetamol 500mg",
//         code: "PAR500",
//         thumbnail: "/mock-product-1.jpg",
//         totalSold: 150,
//         revenue: 750000,
//       },
//       {
//         _id: "2", 
//         name: "Amoxicillin 250mg",
//         code: "AMX250",
//         thumbnail: "/mock-product-2.jpg",
//         totalSold: 120,
//         revenue: 1200000,
//       },
//       {
//         _id: "3",
//         name: "Vitamin C 1000mg",
//         code: "VITC1000",
//         thumbnail: "/mock-product-3.jpg",
//         totalSold: 200,
//         revenue: 600000,
//       },
//     ],
//     statusDistribution: [
//       { status: "Hoàn thành", count: 280, percentage: 62.2 },
//       { status: "Đang giao", count: 85, percentage: 18.9 },
//       { status: "Chờ giao hàng", count: 45, percentage: 10.0 },
//       { status: "Chờ xác nhận", count: 30, percentage: 6.7 },
//       { status: "Đã hủy", count: 10, percentage: 2.2 },
//     ],
//   };
// };
export const generateMockRevenueStats = (): IRevenueStats => {
  return {
    totalRevenue: 15000000,
    totalOrders: 450,
    averageOrderValue: 333333,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3,
    // ✅ Thêm mock data cho time series
    dailyRevenue: [
      { date: "2024-01-01", revenue: 2000000, orders: 50 },
      { date: "2024-01-02", revenue: 2200000, orders: 55 },
      { date: "2024-01-03", revenue: 1800000, orders: 45 },
      { date: "2024-01-04", revenue: 2500000, orders: 60 },
      { date: "2024-01-05", revenue: 2100000, orders: 52 },
      { date: "2024-01-06", revenue: 2300000, orders: 58 },
      { date: "2024-01-07", revenue: 2000000, orders: 50 },
    ],
    weeklyRevenue: [
      { week: "Tuần 1", revenue: 14000000, orders: 350 },
      { week: "Tuần 2", revenue: 15500000, orders: 380 },
      { week: "Tuần 3", revenue: 13200000, orders: 320 },
      { week: "Tuần 4", revenue: 16800000, orders: 420 },
    ],
    monthlyRevenue: [
      { month: "Tháng 1", revenue: 45000000, orders: 1200 },
      { month: "Tháng 2", revenue: 52000000, orders: 1350 },
      { month: "Tháng 3", revenue: 48000000, orders: 1180 },
      { month: "Tháng 4", revenue: 55000000, orders: 1420 },
      { month: "Tháng 5", revenue: 51000000, orders: 1300 },
      { month: "Tháng 6", revenue: 58000000, orders: 1500 },
    ],
    topProducts: [
      {
        _id: "1",
        name: "Paracetamol 500mg",
        code: "PAR500",
        thumbnail:  `/image/thuoc_4.jpg`,
        totalSold: 150,
        revenue: 750000,
      },
      {
        _id: "2", 
        name: "Amoxicillin 250mg",
        code: "AMX250",
        thumbnail:  `/image/thuoc_2.jpg`,
        totalSold: 120,
        revenue: 1200000,
      },
      {
        _id: "3",
        name: "Vitamin C 1000mg",
        code: "VITC1000",
        // thumbnail: "/mock-product-3.jpg",
        thumbnail: `/image/thuoc_1.jpg`,
        totalSold: 200,
        revenue: 600000,
      },
    ],
    statusDistribution: [
      { status: "Hoàn thành", count: 280, percentage: 62.2 },
      { status: "Đang giao", count: 85, percentage: 18.9 },
      { status: "Chờ giao hàng", count: 45, percentage: 10.0 },
      { status: "Chờ xác nhận", count: 30, percentage: 6.7 },
      { status: "Đã hủy", count: 10, percentage: 2.2 },
    ],
  };
};