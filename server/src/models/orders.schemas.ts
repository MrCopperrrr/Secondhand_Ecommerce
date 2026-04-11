import { ObjectId } from 'mongodb';

export enum OrderStatus {
  Pending = 'Pending',     // Chờ xác nhận
  Shipping = 'Shipping',   // Đang giao hàng
  Completed = 'Completed', // Đã hoàn thành
  Cancelled = 'Cancelled'  // Đã hủy
}

export enum PaymentStatus {
  Unpaid = 'Unpaid',
  Paid = 'Paid'
}

export interface Order {
  _id?: ObjectId;
  buyer_id: ObjectId;
  seller_id: ObjectId; // In our simple case, one order per seller for now
  product_ids: ObjectId[];
  total_amount: number;
  shipping_fee: number;
  service_fee: number;
  payment_method: string;
  payment_status: PaymentStatus;
  status: OrderStatus;
  shipping_details: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    province: string;
    ward: string;
    deliveryMethod: string;
    campus: string;
  };
  created_at: Date;
  updated_at: Date;
}

export default class OrderSchema {
  _id?: ObjectId;
  buyer_id: ObjectId;
  seller_id: ObjectId;
  product_ids: ObjectId[];
  total_amount: number;
  shipping_fee: number;
  service_fee: number;
  payment_method: string;
  payment_status: PaymentStatus;
  status: OrderStatus;
  shipping_details: any;
  created_at: Date;
  updated_at: Date;

  constructor(order: Order) {
    this._id = order._id;
    this.buyer_id = order.buyer_id;
    this.seller_id = order.seller_id;
    this.product_ids = order.product_ids;
    this.total_amount = order.total_amount;
    this.shipping_fee = order.shipping_fee;
    this.service_fee = order.service_fee;
    this.payment_method = order.payment_method;
    this.payment_status = order.payment_status || PaymentStatus.Unpaid;
    this.status = order.status || OrderStatus.Pending;
    this.shipping_details = order.shipping_details;
    this.created_at = order.created_at || new Date();
    this.updated_at = order.updated_at || new Date();
  }
}
