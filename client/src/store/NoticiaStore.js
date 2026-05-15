import { create } from "zustand";
import {
  getNoticias,
  verNoticia,
  verCategoria,
  createNoticiaApi,
  updateNoticia,
  deleteNoticia,
  deleteImgNoticia,
  updateImgNoticiaApi,
} from "../api/Noticias.api";

const useNoticiaStore = create((set, get) => ({
  noticia: [],
  noticias: [],
  selectnoticia: null,
  loading: false,

  verNoticias: async () => {
    set({ loading: true });
    try {
      const data = await getNoticias();
      set({ noticia: data, loading: false });
    } catch (error) {
      console.error("Error al obtener noticias:", error);
      set({ loading: false });
    }
  },
  verNoticia: async (id) => {
    try {
      const data = await verNoticia(id);
      return data;
    } catch (error) {
      console.error("Error al obtener la noticia:", error);
    }
  },
  VerCategoria: async (categotia) => {
    try {
      const data = await verCategoria(categotia);
      set({ noticias: data, loading: false });
    } catch (error) {
      console.error("Error al obtener las noticias:", error);
    }
  },

  addNoticia: async (noticiaData, file) => {
    try {
      const data = await createNoticiaApi(noticiaData, file);
      set({ noticia: [...get().noticia, data] });
      console.log("noticia creada:", data);
    } catch (error) {
      console.error("Error al crear programa desde el middleware:", error);
    }
  },

  updateNoticia: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const response = await updateNoticia(id, updatedData);
      set({
        noticias: get().noticias.map((noticia) =>
          noticia.id === id ? response.data : noticia
        ),
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  deleteNoticia: async (id) => {
    try {
      await deleteNoticia(id);
      set({
        noticia: get().noticia.filter((n) => n.id_noticia !== id),
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  deleteImgNoticia: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteImgNoticia(id);
      set({ loading: false });
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  updateImgNoticia: async (id, file) => {
    set({ loading: true, error: null });
    try {
      console.log("file store", file);
      console.log("ID store", id);
      
         

      const response = await updateImgNoticiaApi(id, file);
      set({
        noticia: get().noticia.map((noticia) =>
          noticia.id_noticia === id ? { ...noticia, img: response.img } : noticia
        ),
        loading: false,
      });
      return response;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useNoticiaStore;
