"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const authenticate = (req, res, next) => {
    passport_1.default.authenticate('jwt', (err, user) => {
        if (err || !user) {
            res.status(403).send({
                error: 'token',
                message: ['you do not have access to this resource']
            });
        }
        else {
            req.user = user;
            next();
        }
    })(req, res, next);
};
exports.default = authenticate;
//# sourceMappingURL=isAutenticated.js.map