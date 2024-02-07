import { create } from "zustand";

export const useUpdateEventStore = create((set, get) => ({
  isEdited: false,
  setIsEdited: () => {
    set({ isEdited: !get().isEdited });
  },
}));
