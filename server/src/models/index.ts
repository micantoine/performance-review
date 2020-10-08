import { Sequelize } from 'sequelize';
import sequelize from './sequelize';
import UserModel from './User';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db: any = {
  sequelize,
  Sequelize,
  User: UserModel
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
