import databaseService from "./database.services.js";

class AdminService {
    async getStats(dateStr?: string) {
        // Revenue & Profit should ONLY count if Payment = SUCCESS AND Order = Completed
        const successfulTransactions = await databaseService.transactions.find({ 
            status: 'SUCCESS',
            order_status: 'Completed',
            type: 'PAYMENT'
        }).toArray();

        // Join with orders to get service_fee for profit
        const orderIds = successfulTransactions.map(t => t.order_id);
        const completedOrders = await databaseService.orders.find({ 
            _id: { $in: orderIds } 
        }).toArray();

        const totalSales = successfulTransactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
        const totalProfit = completedOrders.reduce((sum, order) => sum + (Number(order.service_fee) || 0), 0);
        
        // Daily stats
        let dailySales = 0;
        let dailyProfit = 0;

        if (dateStr) {
            const startOfDay = new Date(dateStr);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(dateStr);
            endOfDay.setHours(23, 59, 59, 999);

            // Filter transactions by THEIR creation date (when the payment/completion was recorded)
            // Or better: filter by updated_at if we had it. Since we only have created_at, 
            // We use the transactions created/updated in that day.
            // Actually, for daily "revenue", it's best to look at transactions that reached 'SUCCESS' + 'Completed' on that day.
            // For now, let's look at orders updated on that day.
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
            successful_orders_count: completedOrders.length
        };
    }

    async getAllOrders() {
        return await databaseService.orders.find({}).sort({ created_at: -1 }).toArray();
    }
}

const adminService = new AdminService();
export default adminService;
