"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/extensions */
const models_1 = __importDefault(require("../models"));
const users_json_1 = __importDefault(require("./users.json"));
const reviews_json_1 = __importDefault(require("./reviews.json"));
models_1.default.sequelize.sync({ force: true })
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(users_json_1.default.map((user) => models_1.default.User.create(user)));
    yield Promise.all(reviews_json_1.default.map((review) => models_1.default.Review.create(review)));
}));
//# sourceMappingURL=index.js.map