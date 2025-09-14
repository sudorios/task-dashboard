import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ENV = import.meta.env.VITE_ENV;

if (!API_BASE_URL) {
  console.error("❌ VITE_API_BASE_URL no está definido en tu .env");
}

if (ENV === "production") {
  console.log(
    "%c🚀 Usando API de PRODUCCIÓN:",
    "color: green; font-weight: bold;",
    API_BASE_URL
  );
} else {
  console.warn(
    "%c⚠️ Usando API de DESARROLLO:",
    "color: orange; font-weight: bold;",
    API_BASE_URL
  );
}

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Sesión expirada, cerrando sesión...");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default api;
