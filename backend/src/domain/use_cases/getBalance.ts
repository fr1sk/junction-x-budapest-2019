import { userRepository } from 'gateways';

export async function getBalance(userId: string): Promise<number> {
  return userRepository.getBalance(userId);
}

export default getBalance;
