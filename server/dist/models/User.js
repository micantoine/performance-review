"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
class UserModel extends sequelize_1.Model {
}
function hashPassword(user) {
    const SALT_FACTOR = 8;
    if (!user.changed('password')) {
        return Promise.resolve();
    }
    return bcrypt_1.default
        .genSalt(SALT_FACTOR)
        .then((salt) => bcrypt_1.default.hash(user.password, salt))
        .then((hash) => {
        user.setDataValue('password', hash);
    });
}
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    admin: sequelize_1.DataTypes.BOOLEAN
}, {
    modelName: 'User',
    tableName: 'users',
    sequelize: sequelize_2.default,
    hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
        // beforeSave: hashPassword
    }
});
exports.default = UserModel;
//# sourceMappingURL=User.js.map