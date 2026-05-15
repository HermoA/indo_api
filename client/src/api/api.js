import axios from "axios";

// Crear una instancia de Axios
const api = axios.create({
  baseURL: "https://api.indoamericalaradio.com", // Reemplaza con tu URL de API
});

// Agregar un interceptor para incluir el token en cada solicitud
api.interceptors.request.use((config) => {
  const newLocal = localStorage.getItem("token");
  const token = newLocal; // O sessionStorage

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
