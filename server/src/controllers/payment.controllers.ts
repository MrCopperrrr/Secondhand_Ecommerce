import { Request, Response } from 'express'
import { paymentService } from '../services/payment.services.js'

export const createPaymentController = async (req: Request, res: Response) => {
  try {
    const { amount, bankCode } = req.body
    if (!amount) {
      return res.status(400).json({ message: 'Amount is required' })
    }
    
    const paymentUrl = paymentService.createPaymentUrl(req, amount, bankCode)
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
      // Here you would typically update the order status in your database
      // databaseService.orders.updateOne(...)
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
        // Update database here
        // IMPORTANT: Return RspCode 00 to VNPAY
        return res.status(200).json({ RspCode: '00', Message: 'Success' })
      } else {
        return res.status(200).json({ RspCode: '97', Message: 'Invalid signature' })
      }
    } catch (error) {
      return res.status(200).json({ RspCode: '99', Message: 'Internal error' })
    }
}
