import { Sequelize } from 'sequelize';
import sequelize from './sequelize';
import UserModel from './User';
import ReviewModel from './Review';

interface DbInterface {
  Review: typeof ReviewModel;
  User: typeof UserModel;
  sequelize: Sequelize;
}
const db: DbInterface = {
  sequelize,
  Review: ReviewModel,
  User: UserModel
};

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

export default db;
