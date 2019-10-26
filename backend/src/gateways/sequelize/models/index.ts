import sequelize from '../connection';

const models: Record<string, any> = {
  CustomModel: sequelize.import('./CustomModel'),
  AtmModel: sequelize.import('./AtmModel'),
  UserModel: sequelize.import('./UserModel'),
  TransactionModel: sequelize.import('./TransactionModel'),
};

Object.keys(models).forEach((key): void => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export default models;
