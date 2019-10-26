/* eslint-disable class-methods-use-this */
import { Transaction } from 'domain/entities';
import TransactionModel from 'gateways/mongodb/models/TransactionModel';

export class TransactionRepository {
  async createTransaction(transaction: Transaction): Promise<Transaction> {
    return TransactionModel.create(transaction);
  }

  async update(res_id: string, data: object): Promise<Transaction> {
    return Promise.reject({error: 'Not implemented'});
  }

  async findByReservationIdAndQrCode(res_id: string, qr_code: string): Promise<Transaction> {
    return Promise.reject({error: 'Not implemented'});
  }
}

export default TransactionRepository;
