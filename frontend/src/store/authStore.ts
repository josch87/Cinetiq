import { create } from "zustand";

type LoginModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useLoginModalStore = create<LoginModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
