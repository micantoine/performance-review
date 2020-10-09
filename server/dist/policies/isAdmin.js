"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAdmin = (req, res, next) => {
    if (!req.user) {
        res.status(403).send({
            error: 'admin',
            message: ['you do not have access to this resource, please login']
        });
    }
    // eslint-disable-next-line prefer-destructuring
    const user = req.user;
    if (user.admin) {
        res.status(403).send({
            error: 'admin',
            resspone: req.user,
            message: ['you do not have access to this resource']
        });
    }
    next();
};
exports.default = isAdmin;
//# sourceMappingURL=isAdmin.js.map