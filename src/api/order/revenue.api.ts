import type { IRevenueStats, IOrder, IOrderItem } from "@/interface/order/order.interface"
import { fetchAllOrders } from "./order.api"

/**
 * Tính toán thống kê doanh thu từ dữ liệu đơn hàng thật
 */
export const fetchRevenueStats = async (period: "day" | "week" | "month" = "day"): Promise<IRevenueStats> => {
  try {
    console.log("Fetching revenue stats for period:", period)

    // Lấy tất cả đơn hàng từ API thật
    const orders = await fetchAllOrders()
    console.log("Fetched orders for revenue calculation:", orders.length)

    // Lọc đơn hàng hoàn thành để tính doanh thu
    const completedOrders = orders.filter((order) => order.status === "Hoàn thành")
    console.log("Completed orders:", completedOrders.length)

    // Tính tổng doanh thu và số đơn hàng
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.finalAmount, 0)
    const totalOrders = completedOrders.length
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    // Mock growth data (có thể thay thế bằng logic so sánh với kỳ trước)
    const revenueGrowth = 12.5
    const ordersGrowth = 8.3

    // Tạo dữ liệu theo thời gian
    const timeData = generateTimeSeriesData(completedOrders, period)

    // Tính top products từ order items
    const topProducts = calculateTopProducts(completedOrders)

    // Tính phân bố trạng thái
    const statusDistribution = calculateStatusDistribution(orders)

    const stats: IRevenueStats = {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      revenueGrowth,
      ordersGrowth,
      dailyRevenue: period === "day" ? timeData : [],
      weeklyRevenue: period === "week" ? timeData : [],
      monthlyRevenue: period === "month" ? timeData : [],
      topProducts,
      statusDistribution,
    }

    console.log("Calculated revenue stats:", stats)
    return stats
  } catch (error) {
    console.error("Error fetching revenue stats:", error)
    throw error
  }
}

/**
 * Interface cho dữ liệu time series
 */
interface TimeSeriesData {
  date?: string
  week?: string
  month?: string
  revenue: number
  orders: number
}

/**
 * Tạo dữ liệu time series từ đơn hàng thật
 */
function generateTimeSeriesData(orders: IOrder[], period: "day" | "week" | "month"): TimeSeriesData[] {
  const now = new Date()
  const data: TimeSeriesData[] = []

  if (period === "day") {
    // 7 ngày gần nhất
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]

      const dayOrders = orders.filter((order) => {
        const orderDate = new Date(order.orderDate).toISOString().split("T")[0]
        return orderDate === dateStr
      })

      data.push({
        date: dateStr,
        revenue: dayOrders.reduce((sum, order) => sum + order.finalAmount, 0),
        orders: dayOrders.length,
      })
    }
  } else if (period === "week") {
    // 4 tuần gần nhất
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date(now)
      weekStart.setDate(weekStart.getDate() - i * 7 - weekStart.getDay())
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekEnd.getDate() + 6)

      const weekOrders = orders.filter((order) => {
        const orderDate = new Date(order.orderDate)
        return orderDate >= weekStart && orderDate <= weekEnd
      })

      data.push({
        week: `Tuần ${4 - i}`,
        revenue: weekOrders.reduce((sum, order) => sum + order.finalAmount, 0),
        orders: weekOrders.length,
      })
    }
  } else if (period === "month") {
    // 6 tháng gần nhất
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(now)
      monthDate.setMonth(monthDate.getMonth() - i)
      const monthStart = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1)
      const monthEnd = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0)

      const monthOrders = orders.filter((order) => {
        const orderDate = new Date(order.orderDate)
        return orderDate >= monthStart && orderDate <= monthEnd
      })

      data.push({
        month: monthDate.toLocaleDateString("vi-VN", { month: "long", year: "numeric" }),
        revenue: monthOrders.reduce((sum, order) => sum + order.finalAmount, 0),
        orders: monthOrders.length,
      })
    }
  }

  return data
}

/**
 * Interface cho top product stats
 */
interface TopProductStats {
  _id: string
  name: string
  code: string
  thumbnail: string
  totalSold: number
  revenue: number
}

/**
 * Tính top products từ order items thật
 */
function calculateTopProducts(orders: IOrder[]): TopProductStats[] {
  const productStats: Record<string, TopProductStats> = {}

  // Tổng hợp dữ liệu từ tất cả order items
  orders.forEach((order) => {
    order.orderItems?.forEach((item: IOrderItem) => {
      const productId = item.medicine_id._id

      if (!productStats[productId]) {
        productStats[productId] = {
          _id: productId,
          name: item.medicine_id.name,
          code: item.medicine_id.code,
          thumbnail: item.medicine_id.thumbnail,
          totalSold: 0,
          revenue: 0,
        }
      }

      productStats[productId].totalSold += item.quantity
      productStats[productId].revenue += item.totalAmount
    })
  })

  // Sắp xếp theo doanh thu và lấy top 5
  return Object.values(productStats)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
}

/**
 * Interface cho status distribution
 */
interface StatusDistribution {
  status: string
  count: number
  percentage: number
}

/**
 * Tính phân bố trạng thái từ đơn hàng thật
 */
function calculateStatusDistribution(orders: IOrder[]): StatusDistribution[] {
  const statusCount: Record<string, number> = {}
  const total = orders.length

  // Đếm số lượng theo từng trạng thái
  orders.forEach((order) => {
    const status = order.status
    statusCount[status] = (statusCount[status] || 0) + 1
  })

  // Chuyển đổi thành format cần thiết
  return Object.entries(statusCount).map(([status, count]) => ({
    status,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100 * 10) / 10 : 0,
  }))
}
