require('dotenv').config();
const fs = require('fs');

module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'sesame',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    },
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelizeSeeds'
  },
  test: {
    username: 'root',
    password: 'root',
    database: 'sesame',
    host: '127.0.0.1',
    port: 32574,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    },
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelizeSeeds'
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelizeSeeds'
  }
};
