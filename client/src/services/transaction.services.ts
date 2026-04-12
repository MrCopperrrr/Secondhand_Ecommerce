import api from '../services/api';

export const transactionService = {
  getHistory: () => {
    return api.get('/transactions/history');
  }
};
