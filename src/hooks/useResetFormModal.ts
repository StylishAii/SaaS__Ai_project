import { create } from 'zustand';

interface ResetModalStore {
  isOpen: boolean;
  title: string | undefined;
  api: string | undefined;
  onOpen: ({ title, api }: { title: string; api: string }) => void;
  onClose: () => void;
}

export const useResetFormModal = create<ResetModalStore>(set => ({
  isOpen: false,
  title: undefined,
  api: undefined,
  onOpen: ({ title, api }) => set({ isOpen: true, title, api }),
  onClose: () => set({ isOpen: false, title: undefined, api: undefined }),
}));
