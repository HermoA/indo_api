import { create } from "zustand";
import { createLoginRequest } from "../api/login.api";
import { logout as logoutRequest } from "../api/logout";

const useAuthStore = create((set) => ({
  user: {
    nombre: localStorage.getItem("nombre") || null,
    id: localStorage.getItem("id") || null,
    rol: localStorage.getItem("rol") || null,
  },
  isAuthenticated: !!localStorage.getItem("nombre"),

  login: async (loginData) => {
    try {
      const data = await createLoginRequest(loginData);

      set({
        user: {
          nombre: data.nombre,
          id: data.id,
          rol: data.rol,
        },
        isAuthenticated: true,
      });

      return data;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await logoutRequest();

      set({
        user: { nombre: null, id: null, rol: null },
        isAuthenticated: false,
      });
    } catch (error) {
      console.error("Error en logout:", error);
    }
  },
}));

export default useAuthStore;