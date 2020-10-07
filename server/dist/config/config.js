"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: process.env.PORT || 8080,
    db: {
        database: process.env.DB_NAME || 'reviews',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || '127.0.0.1',
            storage: './dbreviews.sqlite3'
        }
    }
};
//# sourceMappingURL=config.js.map