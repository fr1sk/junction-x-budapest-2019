/* eslint-disable class-methods-use-this */
import { Transaction } from 'domain/entities';
import TransactionModel from 'gateways/mongodb/models/TransactionModel';

export class TransactionRepository {
  async createTransaction(transaction: Transaction): Promise<Transaction> {
    console.log(transaction);
    return TransactionModel.create(transaction);
  }
}

export default TransactionRepository;
