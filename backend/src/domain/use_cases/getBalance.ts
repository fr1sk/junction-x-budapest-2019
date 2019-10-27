import { userRepository } from 'gateways';
import { User } from 'domain/entities';

export async function getBalance(userId: string): Promise<User> {
  return userRepository.getBalance(userId);
}

export default getBalance;
