/* eslint-disable class-methods-use-this */
import { Transaction } from 'domain/entities';
import TransactionModel from 'gateways/mongodb/models/TransactionModel';

export class TransactionRepository {
  async createTransaction(transaction: Transaction): Promise<Transaction> {
    return TransactionModel.create(transaction);
  }

  async updateTransaction(resId: string, data: object): Promise<Transaction> {
    return Promise.reject(new Error('Not implemented'));
  }

  async findByReservationIdAndQrCode(resId: string, qrCode: string): Promise<Transaction> {
    return Promise.reject(new Error('Not implemented'));
  }
}

export default TransactionRepository;
