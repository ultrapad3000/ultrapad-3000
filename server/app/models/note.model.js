const Sequelize = require('sequelize')
const db = require('@srv/db')
const Tag = require('@srv/models/tag.model')

const Note = db.define('note', {
    name: Sequelize.STRING,
    content: Sequelize.TEXT,
    notebookId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'notebooks',
            key: 'id'
        }
    }
})

Note.belongsToMany(Tag, {through: 'Notes_to_Tags'})
Note.sync()

module.exports = Note

