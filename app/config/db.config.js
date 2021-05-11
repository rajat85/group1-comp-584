const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '../../db/config/database.json')[env];

module.exports = {
  HOST: config['host'],
  USER: config['username'],
  PASSWORD: config['password'],
  DB: config['database'],
  dialect: config['dialect'],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
