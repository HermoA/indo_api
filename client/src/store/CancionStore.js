import { create } from "zustand";
import {
  getCanciones,
  getcacion,
  createCancionApi,
  updateCancion,
  deleteCancion,
  searchCanciones,
} from "../api/canciones.api";

const cancionStore = create((set, get) => ({
  cancion: [],
  selectCancion: null,
  loading: false,

  verCaciones: async () => {
    set({ loading: true });
    try {
      const data = await getCanciones();
      set({ cancion: data, loading: false });
    } catch (error) {
      console.error("Error al obtener canciones:", error);
      set({ loading: false });
    }
  },
  verCancion: async (id) => {
    try {
      const data = await getcacion(id);
      return data;
    } catch (error) {
      console.error("Error al obtener cancion:", error);
    }
  },
  createCancion: async (cancionData) => {
    set({ loading: true });
    try {
      const data = await createCancionApi(cancionData);
      set({ cancion: [...get().cancion, data], loading: false });
      console.log("Canción creada:", data);
    } catch (error) {
      console.error("Error al crear canción desde el middleware:", error);
      set({ loading: false });
    }
  },
  updateCancion: async (id, updatedData) => {
    set({ loading: true });
    try {
      const data = await updateCancion(id, updatedData);
      set({
        cancion: get().cancion.map((c) => (c.id_cancione === id ? data : c)),
        selectCancion: data,
        loading: false,
      });
    } catch (error) {
      console.error("Error al actualizar canción:", error);
      set({ loading: false });
    }
  },
  deleteCancion: async (id) => {
    set({ loading: true });
    try {
      await deleteCancion(id);
      set({
        cancion: get().cancion.filter((c) => c.id_cancione !== id),
        loading: false,
      });
    } catch (error) {
      console.error("Error al eliminar canción:", error);
      set({ loading: false });
    }
  },
  searchCanciones: async (query) => {
    set({ loading: true });
    try {
      const data = await searchCanciones(query);
      set({ cancion: data, loading: false });
    } catch (error) {
      console.error("Error al buscar canciones:", error);
      set({ loading: false });
    }
  },

}));
export default cancionStore;
