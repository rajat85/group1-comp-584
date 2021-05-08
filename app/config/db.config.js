const dbConfig = require('../../db/config/database.json');

module.exports = {
  HOST: dbConfig['development']['host'],
  USER: dbConfig['development']['username'],
  PASSWORD: dbConfig['development']['password'],
  DB: dbConfig['development']['database'],
  dialect: dbConfig['development']['dialect'],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
