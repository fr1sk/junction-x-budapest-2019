import { Moment } from 'moment';

export type TransactionRequest = {
    CURRENCY: CurrencyType;
    AMOUNT: number;
    ATM_ID: string;
    USER_ID: string;
    TYPE: string;
    /**
     * Est. time by recommendation engine that is returned back via UI
     * */
    EST_TIME_IN_MINS?: number;
}

export type QrCode = {
    valid_until?: Moment;
    qr_code: string; // encrypted hash containing necessary info
}

export type CreateWithdrawal = {
    transaction_id: string;
    qr_code: string;
}

export type CurrencyType = 'EUR' | 'HUF';
