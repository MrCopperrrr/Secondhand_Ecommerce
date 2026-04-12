import { ObjectId } from 'mongodb'

export interface TransactionType {
  _id?: ObjectId
  user_id: ObjectId       
  order_id: ObjectId      
  amount: number
  type: 'PAYMENT' | 'REFUND'
  payment_method: string 
  status: 'SUCCESS' | 'PENDING' | 'FAILED'
  created_at?: Date
}

export default class Transaction {
  _id?: ObjectId
  user_id: ObjectId
  order_id: ObjectId
  amount: number
  type: 'PAYMENT' | 'REFUND'
  payment_method: string
  status: string
  created_at: Date

  constructor(data: TransactionType) {
    this._id = data._id
    this.user_id = data.user_id
    this.order_id = data.order_id
    this.amount = data.amount
    this.type = data.type
    this.payment_method = data.payment_method
    this.status = data.status || 'PENDING'
    this.created_at = data.created_at || new Date()
  }
}