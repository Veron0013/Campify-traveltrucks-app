import { EngineType, Transmission } from '../services/api/api.types';

// ---- FORMATTER ----
const formatLabel = (value: string): string =>
  value
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

// ---- BOOLEAN FEATURES ----
export const BOOLEAN_FEATURES = [
  { key: 'AC', label: 'AC', icon: 'ac' },
  { key: 'bathroom', label: 'Bathroom', icon: 'bathroom' },
  { key: 'kitchen', label: 'Kitchen', icon: 'kitchen' },
  { key: 'TV', label: 'TV', icon: 'tv' },
  { key: 'radio', label: 'Radio', icon: 'radio' },
  { key: 'refrigerator', label: 'Refrigerator', icon: 'refrigerator' },
  { key: 'microwave', label: 'Microwave', icon: 'microwave' },
  { key: 'gas', label: 'Gas', icon: 'gas' },
  { key: 'water', label: 'Water', icon: 'water' },
] as const;

export type BooleanFeatureKey = (typeof BOOLEAN_FEATURES)[number]['key'];
export type FeatureKey = BooleanFeatureKey;
export type FeatureConfig = {
  label: string;
  icon: string;
};

// ---- FORM CONFIG ----
export const FORM_CONFIG: Record<string, { label: string; icon: string }> = {
  alcove: { label: 'Panel truck', icon: 'alcove' },
  fullyIntegrated: { label: 'Fully Integrated', icon: 'fullyIntegrated' },
  panelTruck: { label: 'Van', icon: 'panelTruck' },
};

// ---- FILTERS CONFIG ----
export const FILTERS_CONFIG: Record<FeatureKey, FeatureConfig> = Object.fromEntries(
  BOOLEAN_FEATURES.map(f => [
    f.key,
    {
      label: f.label,
      icon: f.icon,
    },
  ])
) as Record<FeatureKey, FeatureConfig>;

export const CARD_FEATURES_CONFIG = [
  {
    key: 'form',
    icon: (v: string) => FORM_CONFIG[v].icon,
    label: (v: string) => FORM_CONFIG[v].label,
  },
  {
    key: 'engine',
    icon: () => 'diesel',
    label: (v: EngineType) => formatLabel(v),
  },
  {
    key: 'transmission',
    icon: () => 'automatic',
    label: (v: Transmission) => formatLabel(v),
  },

  ...BOOLEAN_FEATURES.map(f => ({
    key: f.key,
    icon: () => f.icon,
    label: () => f.label,
  })),
] as const;
