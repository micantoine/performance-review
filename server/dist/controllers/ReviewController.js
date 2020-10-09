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
const models_1 = __importDefault(require("../models"));
class ReviewController {
    /**
     * List of reviews
     * @param req {Request}
     * @param res {Response}
     */
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let where = {};
                if (req.user) {
                    where = {
                        reviewerId: req.user.id
                    };
                }
                const reviews = yield models_1.default.Review.findAll({
                    where,
                    include: [
                        {
                            model: models_1.default.User,
                            as: 'reviewee',
                            attributes: ['firstname', 'lastname', 'id']
                        }
                    ]
                });
                const employeesJson = reviews.map((review) => review.toJSON());
                res.send(employeesJson);
            }
            catch (err) {
                res.status(500).send({
                    error: 'reviews',
                    message: ['An error has occured trying to fetch the employees']
                });
            }
        });
    }
    /**
     * List of reviews
     * @param req {Request}
     * @param res {Response}
     */
    static view(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviews = yield models_1.default.Review.findAll({
                    where: {
                        revieweeId: req.params.revieweeId
                    },
                    include: [
                        {
                            model: models_1.default.User,
                            as: 'reviewee',
                            attributes: ['firstname', 'lastname']
                        },
                        {
                            model: models_1.default.User,
                            as: 'reviewer',
                            attributes: ['firstname', 'lastname', 'id']
                        }
                    ]
                });
                res.send(reviews);
            }
            catch (err) {
                res.status(500).send({
                    error: 'reviews',
                    message: ['An error has occured trying to fetch the reviews']
                });
            }
        });
    }
}
exports.default = ReviewController;
//# sourceMappingURL=ReviewController.js.map