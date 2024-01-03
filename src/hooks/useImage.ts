import { create } from 'zustand';

import { ImagePromptWithImages } from '@/db/types';

interface ImageState {
  imagePrompts: ImagePromptWithImages[];
  setImagePrompts: (images: ImagePromptWithImages[]) => void;
  resetImagePrompts: () => void;
}

export const useImage = create<ImageState>(set => ({
  imagePrompts: [],
  setImagePrompts: imagePrompts => set(() => ({ imagePrompts })),
  resetImagePrompts: () => set(() => ({ imagePrompts: [] })),
}));
