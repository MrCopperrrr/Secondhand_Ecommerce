import { Router } from 'express'
import { 
    createPaymentController, 
    vnpayReturnController, 
    vnpayIpnController 
} from '../controllers/payment.controllers.js'

const paymentRouter = Router()

/**
 * @route POST /payments/create_payment_url
 * @desc Create VNPAY payment URL
 */
paymentRouter.post('/create_payment_url', createPaymentController)

/**
 * @route GET /payments/vnpay_return
 * @desc Handle VNPAY browser redirect
 */
paymentRouter.get('/vnpay_return', vnpayReturnController)

/**
 * @route GET /payments/vnpay_ipn
 * @desc Handle VNPAY server-to-server callback
 */
paymentRouter.get('/vnpay_ipn', vnpayIpnController)

export default paymentRouter
