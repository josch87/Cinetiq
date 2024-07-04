import { create } from "zustand";
import { PersonType } from "../model/personModel.ts";

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

type PersonState = {
  person: PersonType | undefined | null;
  setPerson: (person: PersonType | undefined | null) => void;
};

export const usePersonStore = create<PersonState>((set) => ({
  person: undefined,
  setPerson: (person) => set((state) => ({ ...state, person })),
}));
