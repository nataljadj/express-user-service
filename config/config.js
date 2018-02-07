require('dotenv').config();

defaultConf = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'sensarmarine',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '3306',
  dialect: 'mysql',
}

module.exports = {
  development: defaultConf,
  test: defaultConf,
  production: defaultConf,
};