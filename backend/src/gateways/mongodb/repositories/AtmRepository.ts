/* eslint-disable class-methods-use-this */
import { Atm, Location, AtmFilter } from 'domain/entities';
import AtmModel from 'gateways/mongodb/models/AtmModel';
import { getDistanceInKm } from 'lib/distance';

export class AtmRepository {
  async getAtmList(location: Location): Promise<Atm[]> {
    const atms = await AtmModel.find({}).lean();

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
      ...(filter.deposit && { ATM_DEPOSIT: filter.deposit }),
      [`CURRENCY.${filter.currency}`]: {
        $gt: filter.amount,
      },
    }).lean();

    const filteredAtms = this.getNearestAtms(atms, filter.location);

    const scoredAtms = filteredAtms.map((atm, index): Atm => {
      atm.score = (filteredAtms.length - index) * atm.weight + (filteredAtms.length - index) / filteredAtms.length * atm.weight;
      atm.weight += filteredAtms.length / (filteredAtms.length - index) * atm.weight;

      return atm;
    }).sort((a, b) => b.score - a.score);

    await AtmModel.updateOne({ _id: scoredAtms[0]._id }, { weight: scoredAtms[0].weight });

    return atms;
  }

  async incrementBalance(atm_id: string, currency: string, amount: number): Promise<void> {
    const currAtm = await AtmModel.findOne({ _id: atm_id });
    currAtm.CURRENCY[currency] += amount;

    await currAtm.save();
  }

  async decrementBalance(atm_id: string, currency: string, amount: number): Promise<void> {
    // return AtmModel.findOneAndUpdate({_id: atm_id}, {$inc: {CURRENCY: {[currency]: amount}}});
    const currAtm = await AtmModel.findOne({ _id: atm_id });
    currAtm.CURRENCY[currency] -= amount;
    await currAtm.save();
  }
}

export default AtmRepository;
