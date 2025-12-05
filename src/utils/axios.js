import axios from "axios";

// Auth API (Node.js - untuk login/register/logout)
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL || "http://localhost:3000";

// Main API (Rust - untuk features lainnya)
const MAIN_API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Auth API instance (Node.js backend)
export const authAPI = axios.create({
  baseURL: `${AUTH_API_URL}/api`,
});

// Main API instance (Rust backend)
const api = axios.create({
  baseURL: `${MAIN_API_URL}/api`,
});

// Auto-inject token untuk Auth API
authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-inject token untuk Main API
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 errors untuk Auth API
authAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      // Tidak redirect ke /login karena menggunakan modal popup
      // Frontend akan handle dengan menampilkan auth modal
    }
    return Promise.reject(error);
  }
);

// Handle 401 errors untuk Main API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      // Tidak redirect ke /login karena menggunakan modal popup
      // Frontend akan handle dengan menampilkan auth modal
    }
    return Promise.reject(error);
  }
);

export default api;
