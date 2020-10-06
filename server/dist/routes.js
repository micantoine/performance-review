"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello world!!');
    });
};
exports.default = routes;
//# sourceMappingURL=routes.js.map