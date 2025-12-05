//api types
export enum Transmission {
  AUTOMATIC = 'automatic',
  MANUAL = 'manual',
}

export enum EngineType {
  DIESEL = 'diesel',
  PETROL = 'petrol',
  HYBRID = 'hybrid',
}

export type CamperForm = 'alcove' | 'fullyIntegrated' | 'panelTruck';

export interface GalleryImage {
  thumb: string;
  original: string;
}

export interface CamperReview {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface CampersResponse {
  total: number;
  items: CamperData[];
}

export interface CamperData {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;

  form: string;

  length: string;
  width: string;
  height: string;

  tank: string;
  consumption: string;

  transmission: Transmission;
  engine: EngineType;

  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;
  gallery: GalleryImage[];
  reviews: CamperReview[];
}

export interface CamperFeatureData {
  form?: string;
  transmission?: Transmission;
  engine?: EngineType;
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
}

export interface CamperFilterData {
  location?: string;
  form?: string;
  transmission?: Transmission;
  engine?: EngineType;
  AC?: boolean;
  bathroom?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;
  limit?: number;
  page?: number;
}
