import { create } from 'zustand';

const usePlayerStore = create((set) => ({
  isPlaying: false,
  setIsPlaying: (value) => set({ isPlaying: value }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  audioRef: null,
  setAudioRef: (ref) => set({ audioRef: ref }),
  volume: 1, // valor por defecto (máximo)
  setVolume: (value) => set({ volume: value }),
}));

export default usePlayerStore;