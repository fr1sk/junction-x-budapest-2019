import AtmModel from 'gateways/mongodb/models/AtmModel';
import UserModel from 'gateways/mongodb/models/UserModel';
import TransactionModel from 'gateways/mongodb/models/TransactionModel';
import {transactionRepository} from "root/src/gateways";
import {undoReservation} from "root/src/domain/use_cases/undoReservation";

export async function seedData() {
  const user = {
    balance: 50,
    currency: 'EUR',
  };
  const newUser = await UserModel.create(user);
  console.log('-----------NEW USER--------------');
  console.log(newUser);
  console.log('---------------------------------');

  // const atm1 = {
  //   LOCATION: {
  //     X: 47.474856,
  //     Y: 19.098792,
  //   },
  //   ATM_DEPOSIT: true,
  //   CURRENCY: {
  //     EUR: 100,
  //     HUF: 200,
  //   },
  // };

  // const atm2 = {
  //   LOCATION: {
  //     X: 47.481920,
  //     Y: 19.068655,
  //   },
  //   ATM_DEPOSIT: true,
  //   CURRENCY: {
  //     EUR: 300,
  //     HUF: 200,
  //   },
  // };
  // const atm3 = {
  //   LOCATION: {
  //     X: 47.486211,
  //     Y: 19.074642,
  //   },
  //   DEPOSIT: true,
  //   CURRENCY: {
  //     EUR: 500, 
  //     HUF: 300,
  //   },
  // };
  // const newAtm1 = await AtmModel.create(atm1);
  // const newAtm2 = await AtmModel.create(atm2);
  // const newAtm3 = await AtmModel.create(atm3);
  // console.log('-----------NEW ATM--------------');
  // console.log(newAtm1);
  // console.log(newAtm2);
  // console.log(newAtm3);
  // console.log('---------------------------------');

  // const transaction = {
  //   atm: newAtm1._id,
  //   user: newUser._id,
  //   type: 'RESERVE',
  //   amount: 30.5,
  // };
  // const newTransaction = await TransactionModel.create(transaction);
  // console.log('-----------NEW TRANSACTION--------------');
  // console.log(newTransaction);
  // console.log('---------------------------------');

  // const transaction2 = {
  //   atm: newAtm2._id,
  //   user: newUser._id,
  //   type: 'RESERVE',
  //   amount: 30.5,
  //   is_used: false,
  // };
  // const newTransaction2 = await TransactionModel.create(transaction2);
  // console.log('-----------NEW TRANSACTION--------------');
  // console.log(newTransaction2);
  // console.log('---------------------------------');
}
