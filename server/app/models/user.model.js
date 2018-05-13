const db = require('../db');

const Notebook = require('./notebook.model');

const {STRING} = require('sequelize');

const User = db.define('User', {
    username: STRING,
    email: STRING,
    password: STRING,
});

User.hasMany(Notebook)

module.exports = User;
