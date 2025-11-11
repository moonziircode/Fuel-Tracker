
export interface FuelEntry {
  id: string;
  date: string;
  odometer: number;
  liters: number;
}

export interface ProcessedFuelEntry extends FuelEntry {
  distance: number | null;
  kmPerLiter: number | null;
}
