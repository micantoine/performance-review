"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("./sequelize"));
const User_1 = __importDefault(require("./User"));
class ReviewModel extends sequelize_1.Model {
}
ReviewModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    modelName: 'Review',
    tableName: 'reviews',
    sequelize: sequelize_2.default
});
ReviewModel.belongsTo(User_1.default, {
    as: 'reviewer',
    foreignKey: 'reviewerId'
});
ReviewModel.belongsTo(User_1.default, {
    as: 'reviewee',
    foreignKey: 'revieweeId'
});
exports.default = ReviewModel;
//# sourceMappingURL=Review.js.map