/* eslint-disable class-methods-use-this */
import { Atm, Location } from 'domain/entities';
import models from 'gateways/sequelize/models';

export class AtmRepository {
  async getAtmList(location: Location): Promise<Atm[]> {
    return models.AtmModel.findAll({});
  }
}
