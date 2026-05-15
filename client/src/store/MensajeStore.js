import { create } from "zustand";
import {
  getMensajes,
  getMensajesById,
  getMensajeLeido,
  getMensajeNoLeido,
  createMensaje,
  deleteMensaje,
  mensajeLeido,
} from "../api/mensaje.api";

const useMensajeStore = create((set, get) => ({
  mensajes: [],
  mensaje: "",
  selectMensaje: "",
  mensajesLeidos: [],
  mensajesNoLeidos: [],

  fetchMensajes: async () => {
    const response = await getMensajes();
    set({ mensajes: response });
  },

  fetchMensajeById: async (id) => {
    try {
      const response = await getMensajesById(id);
      set({ mensaje: response });
    } catch (error) {
      set({ error: error.message });
    }
  },

  fetchMensajesLeidos: async () => {
    const response = await getMensajeLeido();
    set({ mensajesLeidos: response });
  },

  fetchMensajesNoLeidos: async () => {
    const response = await getMensajeNoLeido();
    set({ mensajesNoLeidos: response });
  },

  addMensaje: async (datamensaje) => {
    const response = await createMensaje(datamensaje);
    set({
      mensajes: [...get().mensaje, response],
    });
  },

  removeMensaje: async (id) => {
    await deleteMensaje(id);
    set((state) => ({
      mensajes: state.mensajes.filter((mensaje) => mensaje.id_contacto !== id),
    }));
  },
  mensajeLeiodo: async (id) => {
    const [data] = await mensajeLeido(id);

    set((state) => ({
      mensajes: state.mensajes.map((mensaje) =>
        mensaje.id_contacto === id ? data : mensaje
      ),
    }));
  },
}));

export default useMensajeStore;
