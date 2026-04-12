import { Request, Response } from 'express';
import { transactionService } from '../services/transactions.services.js';

export const getHistoryController = async (req: Request, res: Response) => {
  try {
    const { user_id } = (req as any).decoded_authorization

    const result = await transactionService.getMyHistory(user_id)
    
    return res.json({ 
      message: 'Lấy lịch sử giao dịch thành công', 
      result 
    });
  } catch (error: any) {
    console.error('Lỗi lấy lịch sử giao dịch:', error);
    return res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};