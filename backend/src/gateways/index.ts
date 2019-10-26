import { CustomRepository } from 'gateways/sequelize/repositories/CustomRepository';
import { AtmRepository } from 'gateways/sequelize/repositories/AtmRepository';

export const customRepository = new CustomRepository();
export const atmRepository = new AtmRepository();
