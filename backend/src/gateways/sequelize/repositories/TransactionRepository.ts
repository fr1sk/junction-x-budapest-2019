import { Transaction } from 'domain/entities/Transaction';
import models from 'gateways/sequelize/models';

export class TransactionRepository {
  async create(transaction: Transaction): Promise<Transaction> {
    return models.TransactionModel.create(transaction);
  }
}
