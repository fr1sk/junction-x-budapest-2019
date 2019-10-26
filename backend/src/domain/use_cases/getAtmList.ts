import { atmRepository } from 'gateways';
import { Atm, Location } from 'domain/entities';

export async function getAtmList(location: Location): Promise<Atm[]> {
  return atmRepository.getAtmList(location);
}

export default getAtmList;
