import {
  Sequelize, Model, ModelCtor, DataTypes
} from 'sequelize';

interface UserInstance extends Model {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export default (sequelize: Sequelize): ModelCtor<UserInstance> => {
  const UserModel = sequelize.define<UserInstance>('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    name: {
      singular: 'user',
      plural: 'users'
    }
  });

  return UserModel;
};
