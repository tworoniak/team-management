import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

const BASE_URL =
  (import.meta.env as Record<string, string | undefined>)['VITE_API_URL'] ??
  'http://localhost:3001/api';

export const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: unknown) => {
    const status =
      typeof error === 'object' &&
      error !== null &&
      'response' in error
        ? (error as { response?: { status?: number } }).response?.status
        : undefined;

    if (status === 401) {
      useAuthStore.getState().clearToken();
      window.location.replace('/login');
    }

    return Promise.reject(error);
  },
);
