import { create } from "zustand";

type ContentCreationDrawerState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useContentCreationDrawerStore = create<ContentCreationDrawerState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
