const User = require('../models/user.model')
const Notebook = require('../models/notebook.model')

const router = new require('express').Router()

const passport = require('passport')

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
        return notebook[0]
    },
    async create(name, color, user) {
        return await user.createNotebook({name, color})
    },
    async edit(id, options, user) {
        const notebook = await this.readOne(id, user)

        if (!notebook) {
            return null
        }

        return await notebook.update(options)
    },
    async delete(id, user) {
        const notebook = await this.readOne(id, user)

        if (!notebook) {
            return null
        }

        return await notebook.destroy()
    }
}

router
    .get('/notebook', async (req, res) => {
        const allFound = await controller.readAll(req.user)
        res.status(200).send(allFound)
    })
    .post('/notebook', async (req, res) => {
        const {name, color} = req.body
        const created = await controller.create(name, color, req.user)
        res.status(200).send(created)
    })
    .delete('/notebook/:id', async (req, res) => {
        const {id} = req.params
        const user = req.user
        const deleted = await controller.delete(id, user)

        res.status(200).send(deleted)
    })
    .get('/notebook/:id', async(req, res) => {
        const {id} = req.params
        const found = await controller.readOne(id, req.user)

        if (!found) {
            res.status(404).send('Not found')
        }

        res.status(200).send(found)
    })
    .put('/notebook/:id', async(req, res) => {
        const {id} = req.params
        const options = req.body
        const {user} = req

        const edited = await controller.edit(id, options, user)

        res.status(200).send(edited)
    })


module.exports = {router, controller}
