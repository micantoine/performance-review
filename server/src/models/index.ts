import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import config from '../config/config';

const basename = path.basename(__filename);
const db: any = {};

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

fs
  .readdirSync(__dirname)
  .filter((file) => file !== basename)
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
