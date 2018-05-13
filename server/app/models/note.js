const Sequelize = require('sequelize');
const db = require('../db');
const tags = require('./tags');
const Note = sequelize.define('note', {
    name:Sequelize.STRING,
    content:Sequelize.STRING,
});
Note.belongsToMany(tags, { through: 'Notes_to_Tags' });
Note.sync();

module.exports = Note;
