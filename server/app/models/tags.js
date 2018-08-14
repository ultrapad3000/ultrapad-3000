const db = require('@srv/db')
const Sequelize = require('sequelize')
const Tags = db.define('notebook', {
    name: Sequelize.STRING
})
Tags.sync()

module.exports = Tags
