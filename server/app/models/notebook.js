const Sequelize = require('sequelize');
const db = require('../db');
const Note = require('./note');
const Notebook = db.define('notebook', {
    name:Sequelize.STRING,
    color:Sequelize.STRING,
  });
  Notebook.hasMany(Note);
  Notebook.sync();

  module.exports = Notebook;