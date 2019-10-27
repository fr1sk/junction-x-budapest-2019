import { atmRepository } from 'gateways';
import { Atm, AtmFilter } from 'domain/entities';

export async function getRecommendedAtms(filter: AtmFilter): Promise<Atm[]> {
  return atmRepository.filterAtms(filter);
}

export default getRecommendedAtms;
