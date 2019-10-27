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

export type TransactionResponse = {
    TRANSACTION_ID: string;
    VALID_UNTIL?: Moment;
    QR_CODE: string; // encrypted hash containing necessary info
}

export type CurrencyType = 'EUR' | 'HUF';
