export interface Transaction {
  atm_id: string;
  user_id: string;
  type: string;
  amount: number;
  qr_code?: string;
};