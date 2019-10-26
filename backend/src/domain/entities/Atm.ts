import { Model, Document } from 'mongoose';

export interface Atm {
    _id?: string;
    location: string;
    balance: number;
    currencies: string[];
}