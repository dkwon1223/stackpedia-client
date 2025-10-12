import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    // CRITICAL: This ensures cookies are sent with every request
    // This is needed for OAuth2 authentication to work
    withCredentials: true
});

apiClient.interceptors.request.use((config) => {
    // If token exists in localStorage (traditional login), send it via Authorization header
    const token = localStorage.getItem('authToken');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // If token exists in cookies (OAuth2 login), it will be sent automatically
    // because withCredentials is set to true
    return config;
});