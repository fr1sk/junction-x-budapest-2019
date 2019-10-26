/* eslint-disable class-methods-use-this */
import { Atm, Location, AtmFilter } from 'domain/entities';
import AtmModel from 'gateways/mongodb/models/AtmModel';
import { getDistanceInKm } from 'lib/distance';
import {CurrencyType} from "root/src/api/routes/transaction/types";

export class AtmRepository {
  async getAtmList(location: Location): Promise<Atm[]> {
    const atms = await AtmModel.find({});

    const nearestFiveAtms = this.getNearestAtms(atms, location);

    return nearestFiveAtms;
  }

  getNearestAtms(atms: Atm[], location: Location) {
    const sortedAtms = atms.sort((a: Atm, b: Atm) => getDistanceInKm(a.LOCATION.X, a.LOCATION.Y,
      location.X, location.Y) - getDistanceInKm(b.LOCATION.X, b.LOCATION.Y,
      location.X, location.Y));

    const nearestFiveAtms = sortedAtms.slice(0, 5);

    return nearestFiveAtms;
  }

  async getAtm(atm_id: string): Promise<Atm> {
    return AtmModel.findById(atm_id);
  }

  async filterAtms(filter: AtmFilter): Promise<Atm[]> {
    const atms = await AtmModel.find({
      ATM_DEPOSIT: filter.deposit,
      CURRENCY: {
        [filter.currency]: {
          $gte: filter.amount,
        }
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
