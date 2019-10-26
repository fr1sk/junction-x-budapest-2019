import { AtmRepository } from 'gateways/mongodb/repositories/AtmRepository';
import { TransactionRepository } from 'gateways/mongodb/repositories/TransactionRepository';
import {UserRepository} from 'gateways/mongodb/repositories/UserRepository';

export const atmRepository = new AtmRepository();
export const transactionRepository = new TransactionRepository();
export const userRepository = new UserRepository();
