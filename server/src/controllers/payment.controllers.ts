import { Request, Response } from 'express'
import { paymentService } from '../services/payment.services.js'
import databaseService from '../services/database.services.js'

export const createPaymentController = async (req: Request, res: Response) => {
  try {
    const { amount, orderId, bankCode } = req.body
    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' })
    }
    
    const paymentUrl = paymentService.createPaymentUrl(req, amount, orderId, bankCode)
    return res.json({ 
        message: 'Payment URL created successfully',
        result: paymentUrl 
    })
  } catch (error) {
    console.error('Error creating payment URL:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const vnpayReturnController = async (req: Request, res: Response) => {
  try {
    const vnp_Params = req.query
    const verify = paymentService.verifyReturn(vnp_Params)
    
    if (verify.success) {
      const vnp_TxnRef = verify.orderId;
      
      // Update payment status for all orders with this ref
      await databaseService.orders.updateMany(
        { vnp_txn_ref: vnp_TxnRef },
        { $set: { payment_status: 'Paid', updated_at: new Date() } }
      );
      
      // Update transaction status
      await databaseService.transactions.updateMany(
        { vnp_txn_ref: vnp_TxnRef }, // wait, I didn't add vnp_txn_ref to transaction yet.
        // Actually, I can find by order_id, but we could have multiple orders.
        // Let's add vnp_txn_ref to transaction too.
        { $set: { status: 'SUCCESS' } }
      );
      return res.json({ 
          message: 'Thanh toán thành công',
          result: verify 
      })
    } else {
      return res.status(400).json({ 
          message: 'Thanh toán thất bại hoặc chữ ký không hợp lệ',
          result: verify 
      })
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const vnpayIpnController = async (req: Request, res: Response) => {
    // This is for VNPAY server-to-server confirmation
    try {
      const vnp_Params = req.query
      const verify = paymentService.verifyReturn(vnp_Params)
      
      if (verify.success) {
        const vnp_TxnRef = verify.orderId;
        
        await databaseService.orders.updateMany(
          { vnp_txn_ref: vnp_TxnRef },
          { $set: { payment_status: 'Paid', updated_at: new Date() } }
        );
        
        await databaseService.transactions.updateMany(
          { vnp_txn_ref: vnp_TxnRef },
          { $set: { status: 'SUCCESS' } }
        );
        
        return res.status(200).json({ RspCode: '00', Message: 'Success' })
      } else {
        return res.status(200).json({ RspCode: '97', Message: 'Invalid signature' })
      }
    } catch (error) {
      return res.status(200).json({ RspCode: '99', Message: 'Internal error' })
    }
}
