/* eslint-disable class-methods-use-this */
import { Transaction } from 'domain/entities';
import TransactionModel from 'gateways/mongodb/models/TransactionModel';
import { Document } from 'mongoose';

type TransactionMongoose = Transaction & Document;

export class TransactionRepository {
  async getTransaction(id): Promise<Transaction> {
    return TransactionModel.findById(id);
  }

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    return TransactionModel.create(transaction);
  }

  async updateTransaction(resId: string, data: object): Promise<Transaction> {
    return TransactionModel.findOneAndUpdate({ _id: resId }, data);
  }

  async findByReservationIdAndQrCode(resId: string, qrCode: string): Promise<Transaction> {
    return TransactionModel.findOne({ _id: resId, qr_code: qrCode });
  }

  async findAllActiveTransactions(): Promise<TransactionMongoose[]> {
    return TransactionModel.find({ is_used: false });
  }
  // findAllActiveTransactions = async () => TransactionModel.find({ is_used: false });
}

export default TransactionRepository;
