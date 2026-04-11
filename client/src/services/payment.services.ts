import axiosInstance from './api';

export const paymentServices = {
  createPaymentUrl: async (payload: { amount: number, bankCode?: string }) => {
    return axiosInstance.post('/payments/create_payment_url', payload);
  },
  verifyPayment: async (params: string) => {
    return axiosInstance.get(`/payments/vnpay_return${params}`);
  }
};
