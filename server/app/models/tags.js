const db = require('../db');
const Sequelize = require('sequelize');
const Tags = db.define('notebook', {
    name:Sequelize.STRING,
  });
  Tags.sync();

  module.exports = Tags;