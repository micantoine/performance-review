"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const User_1 = __importDefault(require("./User"));
const sequelize = new sequelize_1.Sequelize(config_1.default.db.database, config_1.default.db.user, config_1.default.db.password, config_1.default.db.options);
const db = {};
const userModel = User_1.default(sequelize);
db[userModel.name] = userModel;
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
//# sourceMappingURL=index.js.map