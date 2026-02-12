import { create } from 'zustand';

interface Props {
  isFavorite: boolean;
  toggleFavorite: () => void;
  initializeFromApi: (is_favorite: boolean) => void;
}

export const useGlobalStore = create<Props>()((set) => ({
  isFavorite: false,
  toggleFavorite: () => set((state) => ({ isFavorite: !state.isFavorite })),
  initializeFromApi: (is_favorite) =>
    set(() => ({
      isFavorite: is_favorite,
    })),
}));
