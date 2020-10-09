"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationController_1 = __importDefault(require("./controllers/AuthenticationController"));
const AuthenticationControllerPolicy_1 = __importDefault(require("./policies/AuthenticationControllerPolicy"));
const EmployeeController_1 = __importDefault(require("./controllers/EmployeeController"));
const ReviewController_1 = __importDefault(require("./controllers/ReviewController"));
const isAuthenticated_1 = __importDefault(require("./policies/isAuthenticated"));
const isAdmin_1 = __importDefault(require("./policies/isAdmin"));
const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello world!!');
    });
    app.post('/register', [
        AuthenticationControllerPolicy_1.default.register.bind(AuthenticationControllerPolicy_1.default),
        AuthenticationController_1.default.register.bind(AuthenticationController_1.default)
    ]);
    app.post('/login', [
        AuthenticationController_1.default.login.bind(AuthenticationController_1.default)
    ]);
    app.get('/employee', [
        isAuthenticated_1.default,
        isAdmin_1.default,
        EmployeeController_1.default.index
    ]);
    app.get('/reviews', [
        isAuthenticated_1.default,
        ReviewController_1.default.index
    ]);
    app.get('/reviews/:revieweeId', [
        isAuthenticated_1.default,
        ReviewController_1.default.view
    ]);
};
exports.default = routes;
//# sourceMappingURL=routes.js.map