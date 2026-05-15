import { create } from "zustand";
import {
  deleteUser,
  verUsuarios,
  updateUser,
  updaterol,
  verUser,
} from "../api/usuario.api";

const listUsuarios = create((set, get) => ({
  users: [],
  user: "",
  loading: false,
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const response = await verUsuarios(); // Reemplaza con tu endpoint real
      const data = await response;
      set({ users: data, loading: false });
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      set({ loading: false });
    }
  },
  // Obtener un usuario por ID
  getUserById: async (id) => {
    set({ loading: true });
    try {
      const data = await verUser(id); // Reemplaza con tu endpoint real
      set({ user: data, loading: false });
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      set({ loading: false });
    }
  },

  // Eliminar un usuario
  delUser: async (id) => {
    set({ loading: true });
    try {
      await deleteUser(id);
      // Filtra la lista de usuarios para eliminar el usuario
      set({
        users: get().users.filter((user) => user.id_usuario !== id),
        loading: false,
      });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      set({ loading: false });
    }
  },
  toggleAdmin: async (id, rol) => {
    try {
      console.log({ rol });
      const response = await updateUser(id, { rol });
      const data = await response;
      console.log(data);

      // Actualiza la lista de usuarios con el nuevo estado
      set({
        users: get().users.map((user) =>
          user.id_usuario === id ? { ...user, rol } : user
        ),
      });
    } catch (error) {
      console.error("Error al actualizar permisos de administrador:", error);
    }
  },
  updateRol: async (id, rol) => {
    set({ loading: true });
    try {
      const response = await updaterol(id, { rol });
      const data = await response;  
      console.log(data);
         
      set({
        users: get().users.map((user) =>
          user.id_usuario === id ? { ...user, rol } : user
        ),
        loading: false,
      });
    } catch (error) {
      console.error("Error al actualizar rol del usuario:", error);
      set({ loading: false });
    }
  },
  // Actualizar un usuario
  updateUser: async (id, userData) => {
    set({ loading: true });
    try {
      const response = await updateUser(id, userData);
      const data = await response;
      // Actualiza la lista de usuarios con el nuevo estado
      set({
        users: get().users.map((user) =>
          user.id_usuario === id ? { ...user, ...data } : user
        ),
        loading: false,
      });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      set({ loading: false });
    }
  },
}));

export default listUsuarios;
