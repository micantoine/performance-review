import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';
import UserModel from './User';

class ReviewModel extends Model {
  public id!: number;
  public content!: string;
  reviewee?: UserModel;
}

ReviewModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    modelName: 'Review',
    tableName: 'reviews',
    sequelize
  }
);

ReviewModel.belongsTo(UserModel, {
  as: 'reviewer',
  foreignKey: 'reviewerId'
});
ReviewModel.belongsTo(UserModel, {
  as: 'reviewee',
  foreignKey: 'revieweeId'
});

export default ReviewModel;
