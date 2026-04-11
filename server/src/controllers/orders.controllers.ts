import { Request, Response } from 'express';
import orderService from '../services/orders.services.js';

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const result = await orderService.createOrder(req.body);
    return res.json({ message: 'Order created', result });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyPurchasesController = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const result = await orderService.getMyPurchases(user_id);
    return res.json({ message: 'Success', result });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMySalesController = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const result = await orderService.getMySales(user_id);
    return res.json({ message: 'Success', result });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatusController = async (req: Request, res: Response) => {
  try {
    const { order_id } = req.params;
    const { status, user_id } = req.body;
    await orderService.updateOrderStatus(order_id, status, user_id);
    return res.json({ message: 'Status updated' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
