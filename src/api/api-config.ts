import axios from 'axios';

// Configuração do axios para requisições à API
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar token de autenticação, se existir
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Usuário não autenticado, redirecionar para login ou refreshar token
            localStorage.removeItem('auth_token');
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api; 