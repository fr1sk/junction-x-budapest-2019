/* eslint-disable class-methods-use-this */
import { Custom } from 'domain/entities/Custom';
import models from 'gateways/sequelize/models';

export class CustomRepository {
  async getCustomList(): Promise<Custom[]> {
    return models.CustomModel.findAll({});
  }
}
