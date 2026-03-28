import axios from 'axios';

let backendUrl = import.meta.env.VITE_API_BASE_URL || 'https://scalar-assignment-rch4.onrender.com/api';
if (backendUrl && !backendUrl.endsWith('/api')) {
  backendUrl = backendUrl.replace(/\/$/, '') + '/api';
}

const api = axios.create({
  baseURL: backendUrl,
});

// Add a request interceptor to inject the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
