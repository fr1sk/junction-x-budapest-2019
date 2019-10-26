/* eslint-disable class-methods-use-this */
import { Atm, Location } from 'domain/entities';
import AtmModel from 'gateways/mongodb/models/AtmModel';
import { getDistanceInKm } from 'lib/distance';

export class AtmRepository {

  async getAtmList(location: Location): Promise<Atm[]> {
    const atms = await AtmModel.find({});

    const sortedAtms = atms.sort((a: Atm, b: Atm) => 
    getDistanceInKm(a.location.latitude, a.location.longitude, location.latitude, location.longitude)
    - getDistanceInKm(b.location.latitude, b.location.longitude, location.latitude, location.longitude));

    const nearestFiveAtms = sortedAtms.slice(0, 5);

    return nearestFiveAtms;
  }

  async findOneById(atm_id: string):Promise<Atm> {
    return Promise.reject({error: 'Not implemented'});
  };

  async update(atm_id: string, data: object): Promise<Atm> {
    return Promise.reject({error: 'Not implemented'});
  }
}

export default AtmRepository;
