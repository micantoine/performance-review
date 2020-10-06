"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config"));
const routes_1 = __importDefault(require("./routes"));
const app = express_1.default();
app.use(morgan_1.default('combined'));
app.use(body_parser_1.default.json());
app.use(cors_1.default());
routes_1.default(app);
app.listen(config_1.default.port, () => {
    console.log(`Server started at http://localhost:${config_1.default.port}`);
});
//# sourceMappingURL=app.js.map