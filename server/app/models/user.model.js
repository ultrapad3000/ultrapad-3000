const db = require('../db');

const Notebook = require('./notebook.model')

const {STRING} = require('sequelize')

const User = db.define('user', {
    username: STRING,
    email: STRING,
    password: STRING,
});

User.hasMany(Notebook)

User.sync()

module.exports = User;
