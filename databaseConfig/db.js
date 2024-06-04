const { Sequelize } = require('sequelize');
require('dotenv').config();

// Use environment variables for sensitive information
const database = process.env.DB_NAME || 'answers_ai';
const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASSWORD || 'root';
const host = process.env.DB_HOST || '127.0.0.1';
const port = process.env.DB_PORT || 5432;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
  port: port,
  logging: false,
});

module.exports = sequelize;

