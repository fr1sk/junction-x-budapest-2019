import { Location } from './Location';

export interface Atm {
    _id?: string;
    STREET_ADDRESS?: string;
    ZIP?: number;
    ATM_DEPOSIT: boolean;
    LOCATION: Location;
    CURRENCY: Currency;
    TRANSACTIONS: TransactionType[];
    distance?: string;
    weight: number;
    score?: number;
}

interface TransactionType {
  FRIDAY?: string;
  SATURDAY?: string;
  SUNDAY?: string;
}

interface Currency {
  HUF?: number;
  EUR?: number;
}

export interface AtmFilter {
  deposit: boolean;
  location: {
    X: number;
    Y: number;
  };
  amount: number;
  currency: string;
}
