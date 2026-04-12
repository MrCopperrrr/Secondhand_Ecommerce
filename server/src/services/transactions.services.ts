import { ObjectId } from 'mongodb';
import databaseService from './database.services.js';

class TransactionService {
  async getMyHistory(user_id: string) {
    return await databaseService.transactions.aggregate([
      { $match: { user_id: new ObjectId(user_id) } },
      
      { 
        $lookup: {
          from: 'orders',
          localField: 'order_id',
          foreignField: '_id',
          as: 'order_details'
        } 
      },
      
      {
        $unwind: {
          path: '$order_details',
          preserveNullAndEmptyArrays: true 
        }
      },
      
      { $sort: { created_at: -1 } }
    ]).toArray();
  }
}

export const transactionService = new TransactionService();