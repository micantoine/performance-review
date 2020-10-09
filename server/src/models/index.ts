import { Sequelize } from 'sequelize';
import sequelize from './sequelize';
import UserModel from './User';

interface DbInterface {
  User: typeof UserModel;
  sequelize: Sequelize;
}
const db: DbInterface = {
  sequelize,
  User: UserModel
};

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

export default db;
