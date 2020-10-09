export default {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || 'reviews',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || '127.0.0.1',
      storage: './dbreviews.sqlite3'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
};
