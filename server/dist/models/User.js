"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
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
        }
    });
    return UserModel;
};
//# sourceMappingURL=User.js.map