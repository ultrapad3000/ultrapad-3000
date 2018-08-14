const {Op} = require('sequelize')

const Notebook = require('@srv/models/notebook.model')
const Note = require('@srv/models/note.model')

const {Router} = require('express')

const router = new Router()

const passport = require('passport')

router.use(passport.authenticate('jwt'))

const controller = {
    async readAllNotes(user) {
        const allNotebooks = await user.getNotebooks()
        const allNotebooksIds = allNotebooks.map(notebook => notebook.id)
        const allNotes = await Note.findAll({where: {notebookId: {[Op.or]: allNotebooksIds}}})
        return allNotes
    },

    async readAllNotesByNotebook(notebook) {
        const notebookObject = await Notebook.findById(notebook)
        const notes = await notebookObject.getNotes()
        return notes
    },

    async readOne(id, notebookId, user) {
        const doesNotebookBelongsToUser = await user && user.getNotebooks({where: {id: notebookId}})
        if (!Boolean(doesNotebookBelongsToUser)) {
            const notebookNotFoundError = new Error(`User ${user.id} does not have notebook ${notebookId}`)
            notebookNotFoundError.type = 'notebookNotFound'
            throw notebookNotFoundError
        }
        const note = await Note.find({where: {[Op.and]: {notebookId, id}}})
        if (!Boolean(note)) {
            const noteNotFoundError = new Error(`Note ${id} not found`)
            noteNotFoundError.type = 'noteNotFound' // TODO: work on errors
            throw noteNotFoundError
        }
        return note
    },
    async create({name, content}, notebookId, user) {
        try {
            const doesNotebookBelongsToUser = await user.getNotebooks({where: {id: notebookId}})
            if (!Boolean(doesNotebookBelongsToUser)) {
                const notebookNotFoundError = new Error(`User ${user.id} does not have notebook ${notebookId}`)
                notebookNotFoundError.type = 'notebookNotFound'
                throw notebookNotFoundError
            }

            return Note.create({name, content, notebookId})
        } catch (e) {
            const notebookNotFoundError = new Error(`User ${user.id} does not have notebook ${notebookId}`)
            notebookNotFoundError.type = 'notebookNotFound'
            throw notebookNotFoundError
        }
    },
    async edit(id, notebookId, options, user) {
        const note = await this.readOne(id, notebookId, user)

        if (!note) {
            return null
        }

        return await note.update(options)
    },
    async delete(id, notebookId, user) {
        const note = await this.readOne(id, notebookId, user)

        if (!note) {
            return null
        }

        return await note.destroy()
    }
}

router
    .get('/notebook/all/notes', async (req, res) => {
        const allFound = await controller.readAllNotes(req.user)
        res.status(200).send(allFound)
    })
    .get('/notebook/:notebookId/notes', async (req, res) => {
        const {notebookId} = req.params
        const allFound = await controller.readAllNotesByNotebook(notebookId, req.user)
        res.status(200).send(allFound)
    })
    .get('/notebook/:notebookId/notes/:noteId', async (req, res) => {
        const {notebookId, noteId} = req.params
        try {
            const note = await controller.readOne(noteId, notebookId, req.user)
            res.status(200).send(note)
        } catch (e) {
            if (e.type === 'notebookNotFound' || e.type === 'noteNotFound') {
                res.status(404).send(e.message)
            }
            throw e
        }
    })
    .post('/notebook/:notebookId/notes', async (req, res) => {
        const {name, content} = req.body
        const {notebookId} = req.params
        try {
            const created = await controller.create({name, content}, notebookId, req.user)
            res.status(200).send(created)
        } catch (e) {
            if (e.type === 'notebookNotFound') {
                res.status(404).send(e.message)
            }
            throw e
        }
    })
    .delete('/notebook/:notebookId/notes/:id', async (req, res) => {
        const {id, notebookId} = req.params
        const {user} = req

        try {
            const deleted = await controller.delete(id, notebookId, user)
            res.status(200).send(deleted)
        } catch (e) {
            if (e.type === 'notebookNotFound' || e.type === 'noteNotFound') {
                res.status(404).send(e.message)
            }
            throw e
        }
    })
    .put('/notebook/:notebookId/notes/:id', async (req, res) => {
        const {id, notebookId} = req.params
        const options = req.body
        const {user} = req

        try {
            const edited = await controller.edit(id, notebookId, options, user)
            res.status(200).send(edited)
        } catch (e) {
            if (e.type === 'notebookNotFound' || e.type === 'noteNotFound') {
                res.status(404).send(e.message)
            }
            throw e
        }
    })

module.exports = {router, controller}
