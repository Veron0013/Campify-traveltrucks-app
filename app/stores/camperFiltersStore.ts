import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CamperFilterData } from '../services/api/api.types';

interface CamperFiltersStore {
  filters: CamperFilterData;

  setFilter: <Key extends keyof CamperFilterData>(key: Key, value: CamperFilterData[Key]) => void;

  clearFilters: () => void;
}

export const useCamperFilters = create<CamperFiltersStore>()(
  persist(
    set => ({
      filters: {},

      setFilter: (key, value) =>
        set(state => {
          const next: CamperFilterData = { ...state.filters };

          if (value === undefined || value === '' || value === false) {
            delete next[key];
          } else {
            next[key] = value;
          }

          return { filters: next };
        }),

      clearFilters: () => set({ filters: {} }),
    }),
    {
      name: 'camper-filters',
      partialize: state => ({
        filters: state.filters,
      }),
    }
  )
);
