import { create } from "zustand";
import { getArtItunes } from "../api/sonicPanel.api"; 
// ─── Store: portadas del ranking ──────────────────────────────────────────────
const rankingPortadasStore = create((set, get) => ({
  portadas: {}, // { [id_cancione]: url }
  loading: {},  // { [id_cancione]: boolean }

  // Busca y guarda la portada de una canción por su id
  fetchPortada: async (id, titulo, artista) => {
    const { portadas, loading } = get();

    // Si ya está cargada o en proceso, no hacer nada
    if (portadas[id] || loading[id]) return;

    set((state) => ({ loading: { ...state.loading, [id]: true } }));

    const query = artista ? `${titulo} ${artista}` : titulo;
    const url = await getArtItunes(query);

    set((state) => ({
      portadas: { ...state.portadas, [id]: url || null },
      loading: { ...state.loading, [id]: false },
    }));
  },
}));

export default rankingPortadasStore;