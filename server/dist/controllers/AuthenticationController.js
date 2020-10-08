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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../models"));
const config_1 = __importDefault(require("../config/config"));
class AuthenticationController {
    /**
     * Register Controller
     * @param req {Request}
     * @param res  {Response}
     */
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.user = yield models_1.default.User.create(req.body);
                res.send({
                    user: {
                        email: this.user.email,
                        name: this.user.name,
                        isAdmin: this.user.isAdmin
                    },
                    token: this.jwtSignUser()
                });
            }
            catch (err) {
                res.status(400).send({
                    error: 'validation',
                    message: ['This email account already exists.']
                });
            }
        });
    }
    /**
     * Login Controller
     * @param req {Request} the Request
     * @param res {Response} the Response
     */
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                this.user = yield models_1.default.User.findOne({
                    where: {
                        email
                    }
                });
                if (!this.user) {
                    res.status(403).send({
                        error: 'authentication',
                        message: ['The login information was incorrect', 'user does not exist']
                    });
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, this.user.password);
                if (!isPasswordValid) {
                    res.status(403).send({
                        error: 'authentication',
                        message: ['The login information was incorrect', 'password invalid']
                    });
                }
                res.send({
                    email,
                    name: this.user.name,
                    isAdmin: this.user.isAdmin,
                    token: this.jwtSignUser()
                });
            }
            catch (err) {
                res.status(500).send({
                    error: 'authentication',
                    message: ['An error has occured trying to log in']
                });
            }
        });
    }
    /**
     * Create Token
     * @return {string}
     */
    jwtSignUser() {
        const ONE_WEEK = 60 * 60 * 24 * 7;
        return jsonwebtoken_1.default.sign(this.user.toJSON(), config_1.default.authentication.jwtSecret, {
            expiresIn: ONE_WEEK
        });
    }
}
exports.default = new AuthenticationController();
//# sourceMappingURL=AuthenticationController.js.map