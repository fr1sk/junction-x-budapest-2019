import { Location } from './Location';

export interface Atm {
    _id?: string;
    location: Location;
    balance: number;
    currencies: string[];
    distance?: string;
}

export interface AtmFilter {
  deposit: boolean;
  location: Location;
  amount: number;
}
