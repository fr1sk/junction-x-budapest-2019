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

  const atm1 = {
    location: {
      longitude: 47.474856,
      latitude: 19.098792,
    },
    deposit: true,
    balance: 140,
    currencies: ['EUR', 'HUF'],
  };

  const atm2 = {
    location: {
      longitude: 47.481920,
      latitude: 19.068655,
    },
    deposit: true,
    balance: 140,
    currencies: ['EUR', 'HUF'],
  };
  const atm3 = {
    location: {
      longitude: 47.486211,
      latitude: 19.074642,
    },
    deposit: true,
    balance: 140,
    currencies: ['EUR', 'HUF'],
  };
  const newAtm1 = await AtmModel.create(atm1);
  const newAtm2 = await AtmModel.create(atm2);
  const newAtm3 = await AtmModel.create(atm3);
  console.log('-----------NEW ATM--------------');
  console.log(newAtm1);
  console.log(newAtm2);
  console.log(newAtm3);
  console.log('---------------------------------');

  const transaction = {
    atm: newAtm1._id,
    user: newUser._id,
    type: 'RESERVE',
    amount: 30.5,
  };
  const newTransaction = await TransactionModel.create(transaction);
  console.log('-----------NEW TRANSACTION--------------');
  console.log(newTransaction);
  console.log('---------------------------------');

  const transaction2 = {
    atm: newAtm2._id,
    user: newUser._id,
    type: 'RESERVE',
    amount: 30.5,
  };
  const newTransaction2 = await TransactionModel.create(transaction2);
  console.log('-----------NEW TRANSACTION--------------');
  console.log(newTransaction2);
  console.log('---------------------------------');
}
