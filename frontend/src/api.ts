import axios from 'axios';

let backendUrl = import.meta.env.VITE_API_BASE_URL;

// If the environment variable is missing or pointing to the old suspended URL, use the new one
if (!backendUrl || backendUrl.includes('scalar-assignment-rch4.onrender.com')) {
  backendUrl = 'https://scaler-assignment-1-eq2x.onrender.com';
}

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
