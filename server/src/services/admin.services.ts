import databaseService from "./database.services.js";

class AdminService {
    async getStats(dateStr?: string) {
        // Total stats (all time)
        const allCompletedOrders = await databaseService.orders.find({ status: 'Completed' }).toArray();
        const totalSales = allCompletedOrders.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0);
        const totalProfit = allCompletedOrders.reduce((sum, order) => sum + (Number(order.service_fee) || 0), 0);
        
        // Daily stats
        let dailySales = 0;
        let dailyProfit = 0;

        if (dateStr) {
            const startOfDay = new Date(dateStr);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(dateStr);
            endOfDay.setHours(23, 59, 59, 999);

            const dailyOrders = await databaseService.orders.find({
                status: 'Completed',
                updated_at: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            }).toArray();

            dailySales = dailyOrders.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0);
            dailyProfit = dailyOrders.reduce((sum, order) => sum + (Number(order.service_fee) || 0), 0);
        }

        const totalUsers = await databaseService.users.countDocuments();
        const totalProducts = await databaseService.products.countDocuments();
        const totalOrders = await databaseService.orders.countDocuments();

        return {
            total_sales: totalSales,
            total_profit: totalProfit,
            daily_sales: dailySales,
            daily_profit: dailyProfit,
            total_users: totalUsers,
            total_products: totalProducts,
            total_orders: totalOrders,
            successful_orders_count: allCompletedOrders.length
        };
    }

    async getAllOrders() {
        return await databaseService.orders.find({}).sort({ created_at: -1 }).toArray();
    }
}

const adminService = new AdminService();
export default adminService;
