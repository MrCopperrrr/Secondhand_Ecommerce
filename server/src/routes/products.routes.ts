import { Router } from 'express'
import { createProductValidator } from '../middleware/products.middlewares.js'
import { accessTokenValidator } from '../middleware/auth.middlewares.js'
import { createProductController, getSellerProductsController, getProductsController, getProductByIdController, updateProductsStatusController } from '../controllers/products.controllers.js'
export const productRouter= Router()
productRouter.post('/', accessTokenValidator,createProductValidator, createProductController )
productRouter.get('/',  getProductsController)
productRouter.get('/me', accessTokenValidator, getSellerProductsController)
productRouter.get('/:id', getProductByIdController)
productRouter.patch('/status', accessTokenValidator, updateProductsStatusController)