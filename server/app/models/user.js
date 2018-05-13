const db = require('../db');
const Sequelize = require('sequelize');
const Notebook = require('./notebook');
const User = db.define('user', {
    email: Sequelize.STRING,
    password:Sequelize.STRING,
    username:Sequelize.STRING,
  });
  User.hasMany(Notebook);
  User.sync();
module.exports = User;