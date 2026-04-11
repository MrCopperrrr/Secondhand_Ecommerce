import { Router } from 'express';
import { 
  createOrderController, 
  getMyPurchasesController, 
  getMySalesController, 
  updateOrderStatusController 
} from '../controllers/orders.controllers.js';

const orderRouter = Router();

// Order APIs
orderRouter.post('/', createOrderController);
orderRouter.get('/buyer/:user_id', getMyPurchasesController);
orderRouter.get('/seller/:user_id', getMySalesController);
orderRouter.put('/:order_id/status', updateOrderStatusController);

export default orderRouter;
