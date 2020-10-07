import { Sequelize } from 'sequelize';
import config from '../config/config';
import user from './User';

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

const db: any = {};

const userModel = user(sequelize);
db[userModel.name] = userModel;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
