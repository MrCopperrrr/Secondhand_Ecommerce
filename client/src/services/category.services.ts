import api from './api';

export const categoryServices = {
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data.categories;
  },
  getSubCategories: async () => {
    const response = await api.get('/categories/sub');
    return response.data.sub_categories;
  }
};
