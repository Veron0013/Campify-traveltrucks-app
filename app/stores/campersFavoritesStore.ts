import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CamperData } from '../services/api/api.types';

interface FavoritesStore {
  favorites: CamperData[];

  toggleFavorite: (camper: CamperData) => void;
  isFavorite: (id: string) => boolean;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: camper =>
        set(state => {
          const exists = state.favorites.some(f => f.id === camper.id);

          return {
            favorites: exists ? state.favorites.filter(f => f.id !== camper.id) : [...state.favorites, camper],
          };
        }),

      isFavorite: id => get().favorites.some(f => f.id === id),

      removeFavorite: id =>
        set(state => ({
          favorites: state.favorites.filter(f => f.id !== id),
        })),

      clearFavorites: () => set({ favorites: [] }),
    }),

    {
      name: 'favorites-campers',
    }
  )
);
