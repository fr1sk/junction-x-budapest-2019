import { CustomRepository } from 'gateways/sequelize/repositories/CustomRepository';
import { AtmRepository } from 'gateways/sequelize/repositories/AtmRepository';
import { TransactionRepository } from 'gateways/sequelize/repositories/TransactionRepository';

export const customRepository = new CustomRepository();
export const atmRepository = new AtmRepository();
export const transactionRepository = new TransactionRepository();
