import models from 'gateways/sequelize/models';

export async function seedData () {
  const user = {
    balance: 50,
    currency: 'EUR',
  };
  const newUser = await models.UserModel.create(user);

  const atm = {
    location: 'test',
    deposit: true,
    balance: 140,
    currency: ['EUR', 'HUF'],
  };
  const newAtm = await models.AtmModel.create(atm);

  const transaction = {
    atm_id: newAtm.id,
    user_id: newUser.id,
    type: 'RESERVE',
    amount: 30.5,
  };
  await models.TransactionModel.create(transaction);
}