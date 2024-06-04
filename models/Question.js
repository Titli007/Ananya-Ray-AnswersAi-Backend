// models/Question.js
const { DataTypes } = require('sequelize');
const sequelize = require('../databaseConfig/db');
const User = require('./User');

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id : {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    }
  }
});

Question.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Question;