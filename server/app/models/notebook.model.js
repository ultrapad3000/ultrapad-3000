const Sequelize = require('sequelize')
const db = require('@srv/db')
const Note = require('@srv/models/note.model')

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
})
Notebook.hasMany(Note)
Notebook.sync()

module.exports = Notebook
