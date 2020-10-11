import { Sequelize } from 'sequelize';
import sequelize from './sequelize';
import UserModel from './User';
import ReviewModel from './Review';
import DepartmentModel from './Department';

interface DbInterface {
  Department: typeof DepartmentModel;
  Review: typeof ReviewModel;
  User: typeof UserModel;
  sequelize: Sequelize;
}
const db: DbInterface = {
  sequelize,
  Department: DepartmentModel,
  Review: ReviewModel,
  User: UserModel
};

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

export default db;
