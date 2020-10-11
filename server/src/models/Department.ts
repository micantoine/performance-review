import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

class DepartmentModel extends Model {
  public id!: number;
  public name!: string;
}

DepartmentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    modelName: 'Department',
    tableName: 'departments',
    sequelize
  }
);

export default DepartmentModel;
