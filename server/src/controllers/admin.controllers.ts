import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import databaseService from '../services/database.services.js';
import adminService from '../services/admin.services.js';

export const getAdminStatsController = async (req: Request, res: Response) => {
    try {
        const decoded = (req as any).decoded_authorization;
        const user = await databaseService.users.findOne({ _id: new ObjectId(decoded.user_id) });

        if (!user || (user.email !== 'admin@admin.edu.vn' && user.role !== 0)) {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập dữ liệu này' });
        }

        const stats = await adminService.getStats(req.query.date as string);
        return res.json({
            message: 'Lấy dữ liệu quản trị thành công',
            result: stats
        });
    } catch (error) {
        console.error("Lỗi getAdminStatsController:", error);
        return res.status(500).json({
            message: 'Lỗi khi lấy dữ liệu quản trị',
            error
        });
    }
};

export const getAllOrdersAdminController = async (req: Request, res: Response) => {
    try {
        const orders = await adminService.getAllOrders();
        return res.json({
            message: 'Lấy danh sách tất cả đơn hàng thành công',
            result: orders
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Lỗi khi lấy danh sách đơn hàng',
            error
        });
    }
};
