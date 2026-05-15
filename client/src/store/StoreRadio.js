import { create } from "zustand";
import { getRadioInfo, getArtItunes } from "../api/sonicPanel.api";

const storeRadio = create((set) => ({
  radioInfo: null,
  portadapanel: "",
  portada: "",
  portadaOne: "",
  portadaTwo: "",
  loading: false,
  fetchRadioInfo: async () => {
    set({ loading: true });
    try {
      const data = await getRadioInfo();
      set({ radioInfo: data, loading: false });
    } catch (error) {
      console.error("Error al obtener información de la radio:", error);
      set({ loading: false });
    }
  },
  verPortadaPanel: async () => {
    set({ loading: true });
    try {
      const data = await getRadioInfo();
      set({ portadapanel: data, loading: false });
    } catch (error) {
      console.error("error al obtener la portada", error);
      set({ loading: false });
    }
  },
  verPortada: async (title) => {
    set({ loading: true });
    try {
      const response = await getArtItunes(title);
      if (response) {
        const highRes = response.replace(
          /\/[0-9]+x[0-9]+bb\.jpg$/,
          "/600x600bb.jpg"
        );

        set({ portada: highRes, loading: false });
      } else {
        set({ portada: null });
      }
    } catch (error) {
      console.error("Error al obtener portada de la radio:", error);
      set({ loading: false });
    }
  },
  verPortadaOne: async (title) => {
    set({ loading: true });
    try {
      const response = await getArtItunes(title);
      if (response) {
        const highRes = response.replace(
          /\/[0-9]+x[0-9]+bb\.jpg$/,
          "/600x600bb.jpg"
        );

        set({ portadaOne: highRes, loading: false });
      } else {
        set({ portadaOne: null });
      }
    } catch (error) {
      console.error("Error al obtener portada de la radio:", error);
      set({ loading: false });
    }
  },
  verPortadaTwo: async (title) => {
    set({ loading: true });
    try {
      const response = await getArtItunes(title);
      if (response) {
        const highRes = response.replace(
          /\/[0-9]+x[0-9]+bb\.jpg$/,
          "/600x600bb.jpg"
        );

        set({ portadaTwo: highRes, loading: false });
      } else {
        set({ portadaTwo: null });
      }
    } catch (error) {
      console.error("Error al obtener portada de la radio:", error);
      set({ loading: false });
    }
  },
}));

export default storeRadio;
