import { ObjectId } from 'mongodb';
import databaseService from './database.services.js';
import { OrderStatus, PaymentStatus } from '../models/orders.schemas.js';

class OrderService {
  async createOrder(data: any) {
    try {
      console.log('--- START CREATE ORDER ---');
      console.log('Order Data:', JSON.stringify(data, null, 2));

      const result = await databaseService.orders.insertOne({
        ...data,
        buyer_id: new ObjectId(data.buyer_id),
        seller_id: new ObjectId(data.seller_id),
        product_ids: data.product_ids.map((id: string) => new ObjectId(id)),
        created_at: new Date(),
        updated_at: new Date()
      });
      
      console.log('Order Created in DB:', result.insertedId)

      const updateResult = await databaseService.products.updateMany(
        { _id: { $in: data.product_ids.map((id: string) => new ObjectId(id)) } },
        { $set: { status: 0 } }
      );

      console.log('Products status updated:', updateResult.modifiedCount)

      await databaseService.transactions.insertOne({
        user_id: new ObjectId(data.buyer_id),
        order_id: result.insertedId, 
        amount: data.total_amount,
        type: 'PAYMENT',
        payment_method: data.payment_method,
        status: data.payment_method === 'cod' ? 'PENDING' : 'SUCCESS', 
        order_status: data.status || 'Pending',
        created_at: new Date()
      });
      console.log('Transaction Created for Order:', result.insertedId);

      console.log('--- END CREATE ORDER SUCCESS ---');
      return result;
    } catch (error: any) {
      console.error('CRITICAL ERROR IN CREATE ORDER:', error);
      throw error;
    }
  }

  async getMyPurchases(buyer_id: string) {
    // Join with products to show info
    return await databaseService.orders.aggregate([
      { $match: { buyer_id: new ObjectId(buyer_id) } },
      { $lookup: {
          from: 'products',
          localField: 'product_ids',
          foreignField: '_id',
          as: 'products'
      }},
      { $sort: { created_at: -1 } }
    ]).toArray();
  }

  async getMySales(seller_id: string) {
    return await databaseService.orders.aggregate([
      { $match: { seller_id: new ObjectId(seller_id) } },
      { $lookup: {
          from: 'products',
          localField: 'product_ids',
          foreignField: '_id',
          as: 'products'
      }},
      { $sort: { created_at: -1 } }
    ]).toArray();
  }

  async updateOrderStatus(order_id: string, status: OrderStatus, user_id: string) {
      // Find order to check permissions
      const order = await databaseService.orders.findOne({ _id: new ObjectId(order_id) });
      if (!order) throw new Error('Order not found');

      // Logic: 
      // Seller can move Pending -> Shipping / Cancel
      // Buyer can move Shipping -> Completed / Cancel (if Pending)
      
      const updateData: any = { status, updated_at: new Date() };
      
      // If completed, set payment to paid (mostly for COD)
      if (status === OrderStatus.Completed) {
          updateData.payment_status = PaymentStatus.Paid;
      }

      await databaseService.orders.updateOne(
          { _id: new ObjectId(order_id) },
          { $set: updateData }
      );

      // Sync order_status to transactions
      await databaseService.transactions.updateMany(
          { order_id: new ObjectId(order_id) },
          { $set: { order_status: status } }
      );

      return true;
  }
}

const orderService = new OrderService();
export default orderService;
