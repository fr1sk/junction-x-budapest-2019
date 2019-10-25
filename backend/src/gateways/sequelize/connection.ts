import { Sequelize } from 'sequelize';
import constants from 'config/constants';

const sequelize = new Sequelize(constants.DATABASE_URL, {
  dialect: 'postgres',
});
// TODO: migrations
sequelize.sync();

export default sequelize;