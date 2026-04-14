export interface TireSize {
  size: string;
  description: string;
}

export interface TireQuote {
  brand: string;
  model: string;
  price: number;
  currency: string;
  availability: string;
}

export interface VehicleTireData {
  vehicle: string;
  recommendedSizes: TireSize[];
  quotes: TireQuote[];
}
