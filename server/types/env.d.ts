declare namespace NodeJS {
  interface ProcessEnv {
    HOST?: string;
    PORT?: string;
    DB_NAME?: string;
    DB_USER?: string;
    DB_PASS?: string;
    DIALECT?: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
    NODE_ENV: 'development' | 'production';
  }
}
