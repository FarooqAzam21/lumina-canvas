import { create } from "zustand";

export const experienceState = {
  scroll: 0,
  pointer: { x: 0, y: 0 },
  scene: 0,
  labActive: false,
  reducedMotion: false,
};

export const useExperienceStore = create((set) => ({
  loaded: false,
  menuOpen: false,
  activeHotspot: 0,
  muted: true,
  setLoaded: (loaded) => set({ loaded }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  setActiveHotspot: (activeHotspot) => set({ activeHotspot }),
  toggleMuted: () => set((state) => ({ muted: !state.muted })),
}));