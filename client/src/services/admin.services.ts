import api from './api';

export const adminServices = {
    getStats: (date?: string) => {
        return api.get(`/admin/stats${date ? `?date=${date}` : ''}`);
    },
    getAllOrders: () => {
        return api.get('/admin/orders');
    }
};
