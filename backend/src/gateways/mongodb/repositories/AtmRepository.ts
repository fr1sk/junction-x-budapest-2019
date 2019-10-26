/* eslint-disable class-methods-use-this */
import { Atm, Location } from 'domain/entities';
import AtmModel from 'gateways/mongodb/models/AtmModel';

export class AtmRepository {
  async getAtmList(location: Location): Promise<Atm[]> {
    console.log(location);
    return AtmModel.find({});
  }
}

export default AtmRepository;
