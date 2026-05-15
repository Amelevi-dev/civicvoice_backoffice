import axios from "axios";

const API = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_BASE_URL || "https://civicvoice.touredri.dev/",
=======
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3005/api",
>>>>>>> 971d282fc07583ebc263a6afe297d8e2b2af97d6
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (!config.headers) {
    config.headers = {};
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalide, déconnexion automatique
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;