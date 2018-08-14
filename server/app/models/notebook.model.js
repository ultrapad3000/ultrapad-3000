const Sequelize = require('sequelize');
const db = require('../db');
const Note = require('./note.model');
const User = require('./user.model');
const Notebook = db.define('notebook', {
    name: Sequelize.STRING,
    color: Sequelize.STRING,
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  });
Notebook.hasMany(Note);
Notebook.sync();

module.exports = Notebook;
