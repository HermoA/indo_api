import { create } from "zustand";
import {
  verProgramas,
  verPrograma,
  verProgramasDias,
  verActual,
  createProgramaApi,
  updatePrograma,
  deletePrograma,
  uploadImagePrograma,
  deleteImagePrograma,
} from "../api/programa.api";

const programaStore = create((set, get) => ({
  programa: [],
  Programas: "",
  ProgramasDias: [],
  actual: "",
  selectPrograma: null,
  loading: false,

  verProgramas: async () => {
    set({ loading: true });
    try {
      const data = await verProgramas();
      set({ programa: data, loading: false });
    } catch (error) {
      console.error("Error al obtener programas:", error);
      set({ loading: false });
    }
  },
  verProgramasDias: async () => {
    set({ loading: true });
    try {
      const data = await verProgramasDias();
      set({ ProgramasDias: data, loading: false });
    } catch (error) {
      console.error("Error al obtener programas:", error);
      set({ loading: false });
    }
  },

  verPrograma: async (id) => {
    try {
      const data = await verPrograma(id);
      set({ selectPrograma: data });
       return data;    
    } catch (error) {
      console.error("Error al obtener programa:", error);
      return null; // Retorna null en caso de error
    }
  },
  verActual: async () => {
    try {
      const data = await verActual();
      set({ actual: data });
    } catch (error) {
      console.error("Error al obtener programa:", error);
    }
  },

  createPrograma: async (programaData, file) => {
    try {
      const data = await createProgramaApi(programaData, file);
      set({ programa: [...get().programa, data] });
      console.log("Programa creado:", data);
    } catch (error) {
      console.error("Error al crear programa desde el middleware:", error);
    }
  },

  updatePrograma: async (id, updatedData) => {
    set({ loading: true });
    try {
      const data = await updatePrograma(id, updatedData);
      set({
        programa: get().programa.map((p) => (p.id_programa === id ? data : p)),
        selectPrograma: data,
        loading: false,
      });
    } catch (error) {
      console.error("Error al actualizar programa:", error);
      set({ loading: false });
    }
  },

  deleteProgram: async (id) => {
    try {
      await deletePrograma(id);
      set({
        programa: get().programa.filter((p) => p.id_programa !== id),
      });
    } catch (error) {
      console.error("Error al eliminar programa:", error);
    }
  },
  uploadImagePrograma: async (id, file) => {
    try {
      const data = await uploadImagePrograma(id, file);
      set({
        programa: get().programa.map((p) => (p.id_programa === id ? data : p)),
        selectPrograma: data,        
      });
      await get().verProgramasDias();
      return data;
    } catch (error) {
      console.error("Error al subir imagen del programa:", error);
    }
  },
  deleteImagePrograma: async (id) => {
    try {
      const data = await deleteImagePrograma(id);
      set({
        programa: get().programa.map((p) => (p.id_programa === id ? data : p)),
        selectPrograma: data,
      });
      await get().verProgramasDias(id);
    } catch (error) {
      console.error("Error al eliminar imagen del programa:", error);
    }
  },
}));

export default programaStore;
