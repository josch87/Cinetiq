import { create } from "zustand";

type PersonCreationDrawerState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const usePersonCreationDrawerStore = create<PersonCreationDrawerState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
