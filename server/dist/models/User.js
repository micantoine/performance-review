"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
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
exports.default = (sequelize) => {
    const UserModel = sequelize.define('User', {
        name: sequelize_1.DataTypes.STRING,
        email: {
            type: sequelize_1.DataTypes.STRING,
            unique: true
        },
        password: sequelize_1.DataTypes.STRING,
        isAdmin: sequelize_1.DataTypes.BOOLEAN
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
    UserModel.prototype.comparePassword = (password, dbPassword) => bcrypt_1.default.compare(password, dbPassword);
    return UserModel;
};
//# sourceMappingURL=User.js.map