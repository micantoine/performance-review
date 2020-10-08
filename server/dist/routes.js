"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationController_1 = __importDefault(require("./controllers/AuthenticationController"));
const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello world!!');
    });
    app.post('/login', [
        AuthenticationController_1.default.login.bind(AuthenticationController_1.default)
    ]);
};
exports.default = routes;
//# sourceMappingURL=routes.js.map