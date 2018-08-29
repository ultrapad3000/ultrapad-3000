const Router = require('express').Router
const passport = require('passport')
const Boom = require('boom')

const router = new Router()
router.use(passport.authenticate('jwt'))

const controller = {
    async readAll(user) {
        return await user.getNotebooks()
    },
    async readOne(id, user) {
        const notebook = await user.getNotebooks({
            where: {
                id
            }
        })

        if (!notebook[0]) {
            throw Boom.notFound('Notebook not found', {userId: user.id, notebookId: id})
        }

        return notebook[0]
    },
    async create(name, color, user) {
        return await user.createNotebook({name, color})
    },
    async edit(id, options, user) {
        const notebook = await this.readOne(id, user)
        return await notebook.update(options)
    },
    async delete(id, user) {
        const notebook = await this.readOne(id, user)
        return await notebook.destroy()
    }
}

router
    .get('/notebook', async (req, res, next) => {
        try {
            const allFound = await controller.readAll(req.user)
            res.status(200).send(allFound)
        } catch (e) {
            next(e)
        }
    })
    .post('/notebook', async (req, res, next) => {
        const {name, color} = req.body

        try {
            const created = await controller.create(name, color, req.user)
            res.status(200).send(created)
        } catch (e) {
            next(e)
        }
    })
    .delete('/notebook/:id', async (req, res, next) => {
        const {id} = req.params
        const user = req.user

        try {
            const deleted = await controller.delete(id, user)
            res.status(200).send(deleted)
        } catch (e) {
            next(e)
        }
    })
    .get('/notebook/:id', async (req, res, next) => {
        const {id} = req.params

        try {
            const found = await controller.readOne(id, req.user)
            res.status(200).send(found)
        } catch (e) {
            next(e)
        }
    })
    .put('/notebook/:id', async (req, res, next) => {
        const {id} = req.params
        const options = req.body
        const {user} = req

        try {
            const edited = await controller.edit(id, options, user)
            res.status(200).send(edited)
        } catch (e) {
            next(e)
        }
    })

module.exports = {router, controller}
