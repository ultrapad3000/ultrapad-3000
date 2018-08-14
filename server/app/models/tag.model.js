const db = require('@srv/db')
const Sequelize = require('sequelize')
const Tag = db.define('tag', {
    name: Sequelize.STRING
})

Tag.sync()

module.exports = Tag
