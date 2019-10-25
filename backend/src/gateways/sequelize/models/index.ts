import sequelize from '../connection';

const models: Record<string, any> = {
  CustomModel: sequelize.import('./CustomModel'),
};

Object.keys(models).forEach((key): void => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export default models;
