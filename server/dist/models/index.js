"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
const User_1 = __importDefault(require("./User"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = {
    sequelize: sequelize_2.default,
    Sequelize: sequelize_1.Sequelize,
    User: User_1.default
};
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
exports.default = db;
//# sourceMappingURL=index.js.map