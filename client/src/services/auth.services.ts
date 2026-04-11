import api from '../services/api'; 

export const authService = {
  login: (data: any) => {
    return api.post('/users/login', data);
  },

  register: (data: any) => {
    return api.post('/users/register', data);
  },

  logout: (refreshToken: string) => {
    return api.post('/users/logout', { refresh_token: refreshToken });
  },

  getMe: () => {
    return api.get('/users/me');
  },

  updateMe: (data: any) => {
    return api.patch('/users/me', data);
  },

  getAddresses: () => {
    return api.get('/users/me/addresses');
  },
  
  saveAddress: (data: any) => {
    return api.post('/users/me/address', data);
  },

  verifyStudentCard: (image: string) => {
    return api.post('/users/me/verify-student-card', { image });
  }
};