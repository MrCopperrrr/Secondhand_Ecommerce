import { Request } from 'express'
import crypto from 'crypto'
import { config } from 'dotenv'
import qs from 'qs'

config()

class PaymentService {
  public createPaymentUrl(req: Request, amount: number, orderId?: string, bankCode?: string) {
    let date = new Date()
    let createDate = this.formatDate(date)
    
    // Improved IP detection
    let ipAddr = req.headers['x-forwarded-for'] as string ||
                 req.socket.remoteAddress ||
                 '127.0.0.1'
    if (ipAddr.includes(',')) ipAddr = ipAddr.split(',')[0].trim();

    let tmnCode = process.env.VNP_TMN_CODE
    let secretKey = process.env.VNP_HASH_SECRET
    let vnpUrl = process.env.VNP_URL
    let returnUrl = process.env.VNP_RETURN_URL

    let vnp_TxnRef = orderId || (createDate + Math.floor(Math.random() * 1000))
    
    let vnp_Params: any = {}
    vnp_Params['vnp_Version'] = '2.1.0'
    vnp_Params['vnp_Command'] = 'pay'
    vnp_Params['vnp_TmnCode'] = tmnCode
    vnp_Params['vnp_Locale'] = 'vn'
    vnp_Params['vnp_CurrCode'] = 'VND'
    vnp_Params['vnp_TxnRef'] = vnp_TxnRef
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan don hang:' + vnp_TxnRef
    vnp_Params['vnp_OrderType'] = 'other'
    vnp_Params['vnp_Amount'] = amount * 100
    vnp_Params['vnp_ReturnUrl'] = returnUrl
    vnp_Params['vnp_IpAddr'] = ipAddr
    vnp_Params['vnp_CreateDate'] = createDate
    
    if (bankCode !== undefined && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode
    }

    vnp_Params = this.sortObject(vnp_Params)

    let signData = qs.stringify(vnp_Params, { encode: false })
    let hmac = crypto.createHmac('sha512', secretKey || '')
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')
    vnp_Params['vnp_SecureHash'] = signed
    
    let finalUrl = vnpUrl + '?' + qs.stringify(vnp_Params, { encode: false })
    
    console.log("--- VNPAY REQUEST DEBUG ---");
    console.log("TMN CODE:", tmnCode);
    console.log("Generated URL:", finalUrl);
    
    return finalUrl
  }

  public verifyReturn(vnp_Params: any) {
    let secureHash = vnp_Params['vnp_SecureHash']

    delete vnp_Params['vnp_SecureHash']
    delete vnp_Params['vnp_SecureHashType']

    vnp_Params = this.sortObject(vnp_Params)

    let secretKey = process.env.VNP_HASH_SECRET
    let signData = qs.stringify(vnp_Params, { encode: false })
    let hmac = crypto.createHmac('sha512', secretKey || '')
    let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')

    if (secureHash === signed) {
      return {
        success: vnp_Params['vnp_ResponseCode'] === '00',
        orderId: vnp_Params['vnp_TxnRef'],
        amount: vnp_Params['vnp_Amount'],
        vnp_Params
      }
    } else {
      return { success: false, message: 'Invalid signature' }
    }
  }

  private sortObject(obj: any) {
	let sorted: any = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }

  private formatDate(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}${month}${day}${hours}${minutes}${seconds}`
  }
}

export const paymentService = new PaymentService()
