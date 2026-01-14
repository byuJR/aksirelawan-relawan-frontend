import axios from "axios";
import { supabase } from "../config/supabase";

// Main API (Rust - untuk features)
const MAIN_API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Main API instance (Rust backend)
const api = axios.create({
  baseURL: `${MAIN_API_URL}/api`,
});

// Auto-inject Supabase token untuk Main API
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

// Handle 401 errors - auto refresh token with Supabase
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Try to refresh session with Supabase
      const { data: { session }, error: refreshError } = await supabase.auth.refreshSession();
      
      if (refreshError || !session) {
        // Refresh failed, sign out
        await supabase.auth.signOut();
        localStorage.removeItem("user");
        // Frontend will handle showing auth modal
      } else {
        // Retry original request with new token
        error.config.headers.Authorization = `Bearer ${session.access_token}`;
        return axios.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
