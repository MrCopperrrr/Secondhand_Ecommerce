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

export const getSellerProductsController = async (req: any,  res: Response) =>{
    const { user_id } = req.decoded_authorization
    const result = await productService.getProductsBySeller(user_id)
  
    return res.json({
      message: 'Lấy sản phẩm của người bán thành công',
      result
    })
}

export const getProductsController = async (req: Request,  res: Response) =>{
  const result = await productService.getProducts()

  return res.json({
    message: 'Lấy tất cả sản phẩm thành công',
    result
  })
}

export const getProductByIdController = async (req: Request,  res: Response) =>{
  const { id } = req.params as { id: string }
  const result = await productService.getProductById(id)

  if (!result) {
    return res.status(404).json({
      message: 'Sản phẩm không tồn tại'
    })
  }

  return res.json({
    message: 'Lấy chi tiết sản phẩm thành công',
    result
  })
}

export const updateProductsStatusController = async (req: Request, res: Response) => {
  const { ids, status } = req.body
  const result = await productService.updateProductsStatus(ids, status)

  return res.json({
    message: 'Cập nhật trạng thái sản phẩm thành công',
    result
  })
}