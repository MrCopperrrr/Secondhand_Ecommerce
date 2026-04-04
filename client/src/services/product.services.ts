import api from '../services/api'

export const productService = {
    createProduct: (productData: any) => {
      return api.post('/products', productData);
    }
  };