import { Request, Response } from "express"
import productService from '../services/products.services.js'
import { ParamsDictionary } from 'express-serve-static-core'
export const createProductController = async (req: any,  res: Response) =>{
    const { user_id } = req.decoded_authorization
    const result = await productService.createProduct({
        ...req.body,
        seller_id: user_id
      })
    
      return res.json({
        message: 'Đăng sản phẩm thành công',
        result
      })
}