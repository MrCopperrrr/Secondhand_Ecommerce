import { Router } from 'express'
import { getCategoriesController, getSubCategoriesController, getCategoryTreeController } from '../controllers/categories.controllers.js'

const categoriesRouter = Router()

categoriesRouter.get('/', getCategoriesController)
categoriesRouter.get('/sub', getSubCategoriesController)
categoriesRouter.get('/tree', getCategoryTreeController)

export default categoriesRouter
