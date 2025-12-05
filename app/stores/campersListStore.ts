import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CamperData } from '../services/api/api.types';

interface CampersStore {
  campers: CamperData[];
  visibleCount: number;
  isPaginationLoading: boolean;

  startLoading: () => void;
  finishLoading: () => void;

  resetResults: () => void;
  setCampers: (list: CamperData[]) => void;
  showMore: (count?: number) => void;
}

export const useCampersStore = create<CampersStore>()(
  persist(
    set => ({
      campers: [],
      visibleCount: 3,
      isPaginationLoading: false,

      startLoading: () => set({ isPaginationLoading: true }),
      finishLoading: () => set({ isPaginationLoading: false }),

      resetResults: () =>
        set({
          campers: [],
          visibleCount: 3,
        }),

      setCampers: list =>
        set({
          campers: list,
        }),

      showMore: (count = 3) =>
        set(state => ({
          visibleCount: state.visibleCount + count,
        })),
    }),

    {
      name: 'campers-store',
      partialize: state => ({
        visibleCount: state.visibleCount,
      }),
    }
  )
);
