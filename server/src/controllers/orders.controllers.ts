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
    const rawUserId = req.params.user_id;
    const user_id = Array.isArray(rawUserId) ? rawUserId[0] : rawUserId;
    if (!user_id) return res.status(400).json({ message: 'user_id is required' });
    const result = await orderService.getMyPurchases(user_id);
    return res.json({ message: 'Success', result });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMySalesController = async (req: Request, res: Response) => {
  try {
    const rawUserId = req.params.user_id;
    const user_id = Array.isArray(rawUserId) ? rawUserId[0] : rawUserId;
    if (!user_id) return res.status(400).json({ message: 'user_id is required' });
    const result = await orderService.getMySales(user_id);
    return res.json({ message: 'Success', result });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatusController = async (req: Request, res: Response) => {
  try {
    const rawOrderId = req.params.order_id;
    const order_id = Array.isArray(rawOrderId) ? rawOrderId[0] : rawOrderId;
    if (!order_id) return res.status(400).json({ message: 'order_id is required' });
    const { status, user_id } = req.body;
    await orderService.updateOrderStatus(order_id, status, user_id);
    return res.json({ message: 'Status updated' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
