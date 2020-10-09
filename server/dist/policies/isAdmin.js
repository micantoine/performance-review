"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAdmin = (req, res, next) => {
    if (!req.user) {
        res.status(403).send({
            error: 'authentication',
            message: ['You are not authenticated']
        });
    }
    if (!req.user.admin) {
        res.status(403).send({
            error: 'admin',
            message: ['you do not have permission']
        });
    }
    next();
};
exports.default = isAdmin;
//# sourceMappingURL=isAdmin.js.map