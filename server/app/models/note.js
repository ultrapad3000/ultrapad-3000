const Sequelize = require('sequelize')
const db = require('@srv/db')
const tags = require('@srv/models/tags')

const Note = db.define('note', {
    name: Sequelize.STRING,
    content: Sequelize.STRING
})
Note.belongsToMany(tags, {through: 'Notes_to_Tags'})
Note.sync()

module.exports = Note
