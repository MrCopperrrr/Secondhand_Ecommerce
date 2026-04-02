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
  }
};