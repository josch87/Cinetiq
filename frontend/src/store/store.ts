import { create } from "zustand";
import { ContentType } from "../model/contentModel.ts";

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

type ContentState = {
  content: ContentType | undefined | null;
  setContent: (content: ContentType | undefined | null) => void;
};

export const useContentStore = create<ContentState>((set) => ({
  content: undefined,
  setContent: (content) => set((state) => ({ ...state, content })),
}));
