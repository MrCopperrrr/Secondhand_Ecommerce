import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
    baseURL: (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:4000/api',
});

// Add a request interceptor to include auth tokens
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
        const { token } = JSON.parse(userInfoString);
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;
