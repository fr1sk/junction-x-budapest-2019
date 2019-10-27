/* eslint-disable class-methods-use-this */
import { User } from 'domain/entities';
import UserModel from 'gateways/mongodb/models/UserModel';

export class UserRepository {
  async getUser(): Promise<User> {
    const user = await UserModel.findOne({ is_loggedin: false });

    return user;
  }

  async getCurrentUser(id: string): Promise<User> {
    const user = await UserModel.findById(id);

    return user;
  }

  async getBalance(userId: string): Promise<number> {
    const user = await UserModel.findById(userId);

    return user.balance;
  }

  async checkBalance(id: string, amount: number) {
    const user = await UserModel.findById(id);

    if (user.balance < amount) {
      throw new Error('You don\'t have anough money on your account');
    }
  }

  async decrementBalance(user_id: string, amount: number): Promise<void> {
    const usr = await UserModel.findOne({ _id: user_id });
    usr.balance -= amount;
    await usr.save();
  }

  async login(userId: string): Promise<User> {
    return UserModel.findOneAndUpdate({ _id: userId }, { is_loggedin: true });
  }
}
