const Note = require('@srv/models/note.model')

const NotebookController = require('@srv/controllers/notebook.controller').controller

const {Router} = require('express')
const {Op} = require('sequelize')
const Boom = require('boom')

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

    async readAllNotesByNotebook(notebookId, user) {
        const notebook = await NotebookController.readOne(notebookId, user)
        const notes = await notebook.getNotes()
        return notes
    },

    async readOne(id, notebookId, user) {
        const doesNotebookBelongsToUser = await user && user.getNotebooks({where: {id: notebookId}})
        if (!Boolean(doesNotebookBelongsToUser)) {
            throw Boom.notFound('Notebook not found', {userId: user.id, notebookId})
        }
        const note = await Note.find({where: {[Op.and]: {notebookId, id}}})
        if (!note) {
            throw Boom.notFound('Note not found', {userId: user.id, notebookId, noteId: id})
        }
        return note
    },

    async create({name, content}, notebookId, user) {
        const doesNotebookBelongsToUser = await user.getNotebooks({where: {id: notebookId}})
        if (!Boolean(doesNotebookBelongsToUser)) {
            throw Boom.notFound('Notebook not found', {userId: user.id, notebookId})
        }

        return Note.create({name, content, notebookId})
    },

    async edit(id, notebookId, options, user) {
        const note = await this.readOne(id, notebookId, user)
        return await note.update(options)
    },

    async delete(id, notebookId, user) {
        const note = await this.readOne(id, notebookId, user)
        return await note.destroy()
    }
}

router
    .get('/notebook/all/notes', async (req, res) => {
        const allFound = await controller.readAllNotes(req.user)
        res.status(200).send(allFound)
    })
    .get('/notebook/:notebookId/notes', async (req, res, next) => {
        const {notebookId} = req.params
        try {
            const allFound = await controller.readAllNotesByNotebook(notebookId, req.user)
            res.status(200).send(allFound)
        } catch (e) {
            next(e)
        }
    })
    .get('/notebook/:notebookId/notes/:noteId', async (req, res, next) => {
        const {notebookId, noteId} = req.params

        try {
            const note = await controller.readOne(noteId, notebookId, req.user)
            res.status(200).send(note)
        } catch (e) {
            next(e)
        }
    })
    .post('/notebook/:notebookId/notes', async (req, res, next) => {
        const {name, content} = req.body
        const {notebookId} = req.params
        try {
            const created = await controller.create({name, content}, notebookId, req.user)
            res.status(200).send(created)
        } catch (e) {
            next(e)
        }
    })
    .delete('/notebook/:notebookId/notes/:id', async (req, res, next) => {
        const {id, notebookId} = req.params
        const {user} = req

        try {
            const deleted = await controller.delete(id, notebookId, user)
            res.status(200).send(deleted)
        } catch (e) {
            next(e)
        }
    })
    .put('/notebook/:notebookId/notes/:id', async (req, res, next) => {
        const {id, notebookId} = req.params
        const options = req.body
        const {user} = req

        try {
            const edited = await controller.edit(id, notebookId, options, user)
            res.status(200).send(edited)
        } catch (e) {
            next(e)
        }
    })

module.exports = {router, controller}
