export interface Transaction {
  id?: string;
  atm_id: string;
  user_id: string;
  type: string;
  amount: number;
  qr_code?: string;
}

export const TransactionType = {
  WITHDRAW: 'WITHDRAW',
  DEPOSIT: 'DEPOSIT',
  PRESERVE: 'RESERVE',
};
