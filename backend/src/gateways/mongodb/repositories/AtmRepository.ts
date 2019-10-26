/* eslint-disable class-methods-use-this */
import { Atm, Location } from 'domain/entities';
import AtmModel from 'gateways/mongodb/models/AtmModel';

export class AtmRepository {

  async getAtmList(location: Location): Promise<Atm[]> {
    console.log(location);
    return AtmModel.find({});
  }

  async findOneById(atm_id: string):Promise<Atm> {
    return Promise.reject({error: 'Not implemented'});
  };

  async update(atm_id: string, data: object): Promise<Atm> {
    return Promise.reject({error: 'Not implemented'});
  }
}

export default AtmRepository;
