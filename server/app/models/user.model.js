const db = require('@srv/db')

const Notebook = require('@srv/models/notebook.model')

const {STRING} = require('sequelize')

const User = db.define('user', {
    username: STRING,
    email: STRING,
    password: STRING
})

User.hasMany(Notebook)

User.sync()

module.exports = User
