export interface Condominium {
  id: number;
  name: string;
  address: {
      city: string;
  }
  favorite?: boolean;
}