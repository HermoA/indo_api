import { create } from "zustand";
import {
  getRanking,
  getRankingNombre,
  getRankingCanciones,
  getCancionesSinRanking,
  createRanking,
  updateRanking,
  deleteRanking,
  voto,
  delVoto,
  editCancion,
} from "../api/ranking.api";
import { getCanciones, updateCancion } from "../api/canciones.api";

const rankingStore = create((set, get) => ({
  ranking: [],
  Canciones: [],
  cancionesnull: [],
  nombre: "",
  selectRanking: null,
  loading: false,

  verRanking: async () => {
    set({ loading: true });
    try {
      const data = await getRanking();
      set({ ranking: data, loading: false });
    } catch (error) {
      console.error("Error al obtener ranking:", error);
      set({ loading: false });
    }
  },
  verCanciones: async () => {
    set({ loading: true });
    try {
      const data = await getCanciones();
      set({ Canciones: data, loading: false });
    } catch (error) {
      console.error("Error al obtener canciones:", error);
      set({ loading: false });
    }
  },
  rankinNombre: async () => {
    set({ loading: true });
    try {
      const data = await getRankingNombre();
      set({ nombre: data, loading: false });
    } catch (error) {
      console.error("Error al obtener ranking:", error);
      set({ loading: false });
    }
  },
  rankinCanciones: async () => {
    set({ loading: true });
    try {
      const data = await getRankingCanciones();
      set({ ranking: data, loading: false });
    } catch (error) {
      console.error("Error al obtener ranking:", error);
      set({ loading: false });
    }
  },
  rankinCancionesNull: async () => {
    set({ loading: true });
    try {
      const data = await getCancionesSinRanking();
      set({ cancionesnull: data, loading: false });
    } catch (error) {
      console.error("Error al obtener canciones sin ranking:", error);
      set({ loading: false });
    }
  },
  createRanking: async (rankingData) => {
    try {
      const data = await createRanking(rankingData);
      set({ ranking: [...get().ranking, data] });
      console.log("Ranking creado:", data);
    } catch (error) {
      console.error("Error al crear ranking desde el middleware:", error);
    }
  },
  updateRanking: async (id, updatedData) => {
    set({ loading: true });
    try {
      const data = await updateRanking(id, updatedData);
      await get().rankinNombre(); // Recarga el nombre del ranking actualizado
      set({
        ranking: get().ranking.map((r) => (r.id_ranking === id ? data : r)),
        loading: false,
      });
      console.log("Ranking actualizado:", data);
      
    } catch (error) {
      console.error("Error al actualizar ranking:", error); 
      set({ loading: false });
    }
  },
  deleteRanking: async (id) => {
    set({ loading: true });
    try {
      await deleteRanking(id);
      set({
        ranking: get().ranking.filter((r) => r.id_ranking !== id),
        loading: false,
      });
    } catch (error) {
      console.error("Error al eliminar ranking:", error);
      set({ loading: false });
    }
  },
  voto: async (data) => {
    set({ loading: true });
    try {
      const response = await voto(data);
      await get().rankinCanciones(); // Recarga el ranking actualizado
      set({ loading: false });
      return response;
    } catch (error) {
      console.error("Error al enviar voto:", error);
      set({ loading: false });
    }
  },
  delVoto: async (id) => {
    set({ loading: true });
    try {
      const response = await delVoto(id);
      await get().rankinCanciones(); // Recarga el ranking actualizado
      set({ loading: false });
      return response;
    } catch (error) {
      console.error("Error al eliminar voto:", error);
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
  editCancion: async (id, updatedData) => {
    set({ loading: true });
    try {
      const data = await editCancion(id, updatedData);
      await get().rankinCancionesNull(); // Recarga las canciones sin ranking actualizadas
      await get().rankinCanciones(); // Recarga el ranking actualizado
      set({
        selectCancion: data,
        loading: false,
      });
    } catch (error) {
      console.error("Error al editar canción:", error);
      set({ loading: false });
    }
  },
}));
export default rankingStore;
