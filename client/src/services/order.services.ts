import api from './api';

export const orderServices = {
  createOrder: (data: any) => {
    return api.post('/orders', data);
  },
  getMyPurchases: (userId: string) => {
    return api.get(`/orders/buyer/${userId}`);
  },
  getMySales: (userId: string) => {
    return api.get(`/orders/seller/${userId}`);
  },
  updateOrderStatus: (orderId: string, status: string, userId: string) => {
    return api.put(`/orders/${orderId}/status`, { status, user_id: userId });
  }
};
