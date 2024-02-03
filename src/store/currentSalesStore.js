import { create } from "zustand";
import { persist } from "zustand/middleware";

//segundo nivel de store
export const useCurrrentSalesStore = create((set, get) => ({
  isCurrentSalesModified: false,
  setCurrentSalesModified: () => {
    set({ isCurrentSalesModified: !get().isCurrentSalesModified });
  },
}));
