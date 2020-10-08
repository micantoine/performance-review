"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class AuthenticationControllerPolicy {
    constructor() {
        this.schema = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().required()
            // password: Joi.string().regex(
            //   new RegExp('^[a-zA-Z0-9]{8,32}$')
            // )
        });
    }
    /**
     * Register Policy
     * @param req {Request}
     * @param res {Response}
     * @param next {NextFunction}
     */
    register(req, res, next) {
        const { error } = this.schema.validate(req.body);
        if (error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'validation',
                        message: error.details[0].message
                    });
                    break;
                case 'password':
                    res.status(400).send({
                        error: 'validation',
                        message: [
                            'Your password has failed',
                            'It must contain lowercase, uppercase, numbers.',
                            'It must be at least 8 characters long'
                        ]
                    });
                    break;
                default:
                    res.status(400).send({
                        error: 'validation',
                        message: ['Invalid registration confirmation']
                    });
                    break;
            }
        }
        else {
            next();
        }
    }
}
exports.default = new AuthenticationControllerPolicy();
//# sourceMappingURL=AuthenticationControllerPolicy.js.map