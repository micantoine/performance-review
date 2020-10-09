import bcrypt from 'bcrypt';
import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize';

class UserModel extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstname: string;
  public lastname: string;
  public admin: boolean;
}

function hashPassword(user: UserModel) {
  const SALT_FACTOR = 8;

  if (!user.changed('password')) {
    return Promise.resolve();
  }

  return bcrypt
    .genSalt(SALT_FACTOR)
    .then((salt) => bcrypt.hash(user.password, salt))
    .then((hash) => {
      user.setDataValue('password', hash);
    });
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    admin: DataTypes.BOOLEAN
  },
  {
    modelName: 'User',
    tableName: 'users',
    sequelize,
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
      // beforeSave: hashPassword
    }
  }
);

export default UserModel;
