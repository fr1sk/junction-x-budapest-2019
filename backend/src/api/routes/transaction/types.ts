import { Moment } from 'moment';

export type CreateReservation = {
    currency: CurrencyType;
    amount: number;
    atm_id: string;
    user_id: string;
    /**
     * Est. time by recommendation engine that is returned back via UI
     * */
    estimated_time_in_mins: number;
}

export type QrCode = {
    valid_until: Moment;
    qr_code: string; // encrypted hash containing necessary info
}

export type CurrencyType = 'EUR' | 'HUF';
