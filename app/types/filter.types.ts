import { CamperFeatureData, CamperForm, EngineType, Transmission } from '../services/api/api.types';

export type EnumFeatureKey = 'transmission' | 'engine' | 'form';

export type FeatureKey = keyof CamperFeatureData;

export interface FeatureConfig {
  label: string;
  icon?: string | null;
  values?: string[];
}
export interface CardFeatureConfig {
  key: keyof CamperFeatureData;
  icon: string;
  label: (value: string) => string;
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

  //// BOOLEAN FIELDS
  //location: { label: 'Location', icon: 'location' },

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

const formatLabel = (value: string): string =>
  value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

export const CARD_FEATURES_CONFIG: CardFeatureConfig[] = [
  {
    key: 'transmission',
    icon: 'automatic',
    label: v => formatLabel(v),
  },
  {
    key: 'engine',
    icon: 'diesel',
    label: v => formatLabel(v),
  },
  {
    key: 'form',
    icon: 'alcove',
    label: v => formatLabel(v),
  },

  { key: 'AC', icon: 'ac', label: () => 'AC' },
  { key: 'bathroom', icon: 'bathroom', label: () => 'Bathroom' },
  { key: 'kitchen', icon: 'kitchen', label: () => 'Kitchen' },
  { key: 'TV', icon: 'tv', label: () => 'TV' },
  { key: 'radio', icon: 'radio', label: () => 'Radio' },
  { key: 'refrigerator', icon: 'refrigerator', label: () => 'Refrigerator' },
  { key: 'microwave', icon: 'microwave', label: () => 'Microwave' },
  { key: 'gas', icon: 'gas', label: () => 'Gas' },
  { key: 'water', icon: 'water', label: () => 'Water' },
];
