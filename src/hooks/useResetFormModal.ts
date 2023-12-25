import { create } from 'zustand';

interface ResetModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useResetFormModal = create<ResetModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
