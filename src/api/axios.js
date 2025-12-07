
import axios from "axios";

const API = axios.create({
 baseURL: import.meta.env.VITE_API_BASE_URL + "/api", // backend URL
});

// Attach token automatically 
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = token;
  return config;
});

// If backend returns 401 → logout(Auto-logout if token invalid)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      window.location.href = "/"; // redirect to login
    }
    return Promise.reject(error);
  }
);

export default API;
