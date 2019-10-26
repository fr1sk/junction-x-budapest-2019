import { Sequelize } from 'sequelize';
import constants from 'config/constants';
import { seedData } from 'lib/seedData';

const sequelize = new Sequelize(constants.DATABASE_URL, {
  dialect: 'postgres',
});
// TODO: migrations
sequelize.sync({ force: true }).then(async () => {
  await seedData();
});

export default sequelize;
