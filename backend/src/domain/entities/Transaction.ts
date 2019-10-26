export interface Transaction {
  _id?: string;
  atm: string;
  user: string;
  type: string;
  amount: number;
  qr_code?: string;
  is_used: boolean;
  currency_type: string;
  valid_until?: Date;
}

export const TransactionType = {
  WITHDRAW: 'WITHDRAW',
  DEPOSIT: 'DEPOSIT',
  PRESERVE: 'RESERVE',
};
