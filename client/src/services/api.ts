import axios, { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({

    baseURL: (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:4001/',
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const userInfoString = localStorage.getItem('userInfo')
    if (userInfoString) {
        try {
            const userInfo = JSON.parse(userInfoString)
            const token = userInfo?.access_token
            
            if (token) {
                config.headers.set('Authorization', `Bearer ${token}`)
            }
        } catch (error) {
            console.error("Lỗi parse userInfo:", error)
        }
    }
    return config
});

export default api