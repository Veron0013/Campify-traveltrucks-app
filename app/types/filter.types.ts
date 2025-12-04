import { CamperFilterData, CamperForm, EngineType, Transmission } from '../services/api/api.types';

export type EnumFeatureKey = 'transmission' | 'engine' | 'form';

export type FeatureKey = keyof CamperFilterData;

export interface FeatureConfig {
  label: string;
  icon?: string | null;
  values?: string[];
}

export const FORM_CONFIG: Record<CamperForm, { label: string; icon: string }> = {
  [CamperForm.ALCOVE]: {
    label: 'Alcove',
    icon: 'alcove',
  },
  [CamperForm.INTEGRATED]: {
    label: 'Fully Integrated',
    icon: 'integrated',
  },
  [CamperForm.VAN]: {
    label: 'Van',
    icon: 'van',
  },
};

export const FEATURES_CONFIG: Record<FeatureKey, FeatureConfig> = {
  // SELECT FIELDS
  transmission: {
    label: 'Transmission',
    icon: 'manual',
    values: Object.values(Transmission),
  },

  engine: {
    label: 'Engine',
    icon: 'diesel',
    values: Object.values(EngineType),
  },

  form: {
    label: 'Form',
    icon: null,
    values: Object.values(CamperForm),
  },

  // BOOLEAN FIELDS
  location: { label: 'Location', icon: 'location' },

  AC: { label: 'AC', icon: 'ac' },
  bathroom: { label: 'Bathroom', icon: 'bathroom' },
  kitchen: { label: 'Kitchen', icon: 'kitchen' },
  TV: { label: 'TV', icon: 'tv' },
  radio: { label: 'Radio', icon: 'radio' },
  refrigerator: { label: 'Refrigerator', icon: 'refrigerator' },
  microwave: { label: 'Microwave', icon: 'microwave' },
  gas: { label: 'Gas', icon: 'gas' },
  water: { label: 'Water', icon: 'water' },
};
