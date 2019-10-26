import { AtmRepository } from 'gateways/mongodb/repositories/AtmRepository';
import { TransactionRepository } from 'gateways/mongodb/repositories/TransactionRepository';

export const atmRepository = new AtmRepository();
export const transactionRepository = new TransactionRepository();
