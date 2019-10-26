import AtmModel from 'gateways/mongodb/models/AtmModel';
import UserModel from 'gateways/mongodb/models/UserModel';
import TransactionModel from 'gateways/mongodb/models/TransactionModel';

export async function seedData() {
  const user = {
    balance: 50,
    currency: 'EUR',
  };
  const newUser = await UserModel.create(user);
  console.log('-----------NEW USER--------------');
  console.log(newUser);
  console.log('---------------------------------');

  const atm = {
    location: 'test',
    deposit: true,
    balance: 140,
    currencies: ['EUR', 'HUF'],
  };
  const newAtm = await AtmModel.create(atm);
  console.log('-----------NEW ATM--------------');
  console.log(newAtm);
  console.log('---------------------------------');

  const transaction = {
    atm: newAtm._id,
    user: newUser._id,
    type: 'RESERVE',
    amount: 30.5,
  };
  const newTransaction = await TransactionModel.create(transaction);
  console.log('-----------NEW TRANSACTION--------------');
  console.log(newTransaction);
  console.log('---------------------------------');

  const transaction2 = {
    atm: newAtm._id,
    user: newUser._id,
    type: 'RESERVE',
    amount: 30.5,
  };
  const newTransaction2 = await TransactionModel.create(transaction2);
  console.log('-----------NEW TRANSACTION--------------');
  console.log(newTransaction2);
  console.log('---------------------------------');
  
}
