import { User } from 'domain/entities';
import UserModel from 'gateways/mongodb/models/UserModel';

export class UserRepository {
  async getUser(): Promise<User> {
    const user =  await UserModel.findOne({ is_loggedin: false });

    return user;
  }

  async decrementBalance(user_id: string, amount: number): Promise<void> {
    await UserModel.findOneAndUpdate({_id: user_id}, {$inc: {balance: -amount}});
  }

  async login(userId: string): Promise<User> {
    return UserModel.findOneAndUpdate({ _id: userId }, { is_loggedin: true });
  }
}
