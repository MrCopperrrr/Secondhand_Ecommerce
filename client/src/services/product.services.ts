import api from '../services/api'

export const productService = {
    createProduct: (productData: any) => {
      return api.post('/products', productData);
    },
    getProductsBySeller: () => {
      return api.get('/products/me');
    },
    getAllProducts: () => {
      return api.get('/products');
    },
    getProductById: (id: string) => {
      return api.get(`/products/${id}`);
    },
    updateProduct: (id: string, data: any) => {
      return api.put(`/products/${id}`, data);
    },
    deleteProduct: (id: string) => {
      return api.delete(`/products/${id}`);
    },
    updateProductStatus: (ids: string[], status: number) => {
      return api.patch('/products/status', { ids, status });
    }
  };