import UserModel from "gateways/mongodb/models/UserModel";

export class UserRepository {

    async decrementBalance(user_id: string, amount: number): Promise<void> {
        await UserModel.findOneAndUpdate({_id: user_id}, {$inc: {balance: -amount}});
    }
}
