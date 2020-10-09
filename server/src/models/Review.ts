import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';
import User from './User';

class ReviewModel extends Model {
  public id!: number;
  public content!: string;
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

ReviewModel.belongsTo(User, {
  as: 'reviewer',
  foreignKey: 'reviewerId'
});
ReviewModel.belongsTo(User, {
  as: 'reviewee',
  foreignKey: 'revieweeId'
});

export default ReviewModel;
