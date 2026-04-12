import { Router } from 'express';
import { getHistoryController } from '../controllers/transactions.controllers.js'
import { accessTokenValidator } from '../middleware/auth.middlewares.js';

const transactionRouter = Router()

transactionRouter.get('/history', accessTokenValidator, getHistoryController)

export default transactionRouter