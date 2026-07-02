const defaultApiUrl = 'https://linkedin-backend-3b3o.onrender.com';

export const apiBaseUrl = import.meta.env.VITE_API_URL || defaultApiUrl;
export const socketBaseUrl = import.meta.env.VITE_SOCKET_URL || apiBaseUrl;
