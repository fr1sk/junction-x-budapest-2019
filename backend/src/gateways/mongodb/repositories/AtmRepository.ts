/* eslint-disable class-methods-use-this */
import { Atm, Location, AtmFilter } from 'domain/entities';
import AtmModel from 'gateways/mongodb/models/AtmModel';
import { getDistanceInKm } from 'lib/distance';
import {CurrencyType} from "root/src/api/routes/transaction/types";

export class AtmRepository {
  async getAtmList(location: Location): Promise<Atm[]> {
    const atms = await AtmModel.find({});

    const nearestFiveAtms = this.getNearestAtms(atms, location);

    // const filtered = await this.filterAtms({
    //   deposit: true,
    //   location: {
    //     latitude: 23,
    //     longitude: 23,
    //   },
    //   amount: 20,
    // });

    return nearestFiveAtms;
  }

  getNearestAtms(atms: Atm[], location: Location) {
    const sortedAtms = atms.sort((a: Atm, b: Atm) => getDistanceInKm(a.location.latitude, a.location.longitude,
      location.latitude, location.longitude) - getDistanceInKm(b.location.latitude, b.location.longitude,
      location.latitude, location.longitude));

    const nearestFiveAtms = sortedAtms.slice(0, 5);

    return nearestFiveAtms;
  }

  async getAtm(atm_id: string): Promise<Atm> {
    return AtmModel.findById(atm_id);
  }

  async filterAtms(filter: AtmFilter): Promise<Atm[]> {
    const atms = await AtmModel.find({
      deposit: filter.deposit,
      balance: {
        $gte: filter.amount,
      },
    });

    const filteredAtms = this.getNearestAtms(atms, filter.location);

    return filteredAtms;
  }

  async updateAtm(atm_id: string, data: object): Promise<Atm> {
    return Promise.reject(new Error('Not implemented'));
  }

  async incrementBalance(atm_id: string, currency: CurrencyType, amount: number): Promise<Atm> {
    return AtmModel.findOneAndUpdate({_id: atm_id}, {$inc: {CURRENCY: {[currency]: amount}}});
  }
}

export default AtmRepository;
