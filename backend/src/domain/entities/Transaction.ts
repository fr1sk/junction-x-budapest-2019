import { Atm } from './Atm';
import { User } from './User';

export interface Transaction {
  _id?: string;
  atm: string;
  user: string;
  type: string;
  amount: number;
  qr_code?: string;
}

export const TransactionType = {
  WITHDRAW: 'WITHDRAW',
  DEPOSIT: 'DEPOSIT',
  PRESERVE: 'RESERVE',
};
