import bcrypt from 'bcrypt';
import {
  Sequelize, Model, ModelCtor, DataTypes
} from 'sequelize';

interface UserInstance extends Model {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

function hashPassword(user: UserInstance) {
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
    },
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword
      // beforeSave: hashPassword
    }
  });

  // eslint-disable-next-line max-len
  UserModel.prototype.comparePassword = (password: string, dbPassword: string) => bcrypt.compare(password, dbPassword);

  return UserModel;
};
