import { Sequelize } from 'sequelize';
import config from '../config/config';

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

export default sequelize;
