import { Router } from 'express'
import { getCategoriesController, getSubCategoriesController } from '../controllers/categories.controllers.js'

const categoriesRouter = Router()

categoriesRouter.get('/', getCategoriesController)
categoriesRouter.get('/sub', getSubCategoriesController)

export default categoriesRouter
