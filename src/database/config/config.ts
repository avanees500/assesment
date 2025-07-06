import * as dotenv from 'dotenv';
dotenv.config();

export default {
  development: {
    username: process.env.POSTGRES_USER || 'myuser',
    password: process.env.POSTGRES_PASSWORD || 'mypassword',
    database: process.env.POSTGRES_DB || 'mydatabase',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: process.env.POSTGRES_USER || 'myuser',
    password: process.env.POSTGRES_PASSWORD || 'mypassword',
    database: process.env.POSTGRES_DB + '_test' || 'mydatabase_test',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB + '_prod',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true',
    },
  },
};
