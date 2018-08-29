require('module-alias/register')

const express = require('express')

const authPlugin = require('@srv/auth')
const errorHandlerMiddleware = require('@srv/error')

const NotebookController = require('@srv/controllers/notebook.controller')
const NoteController = require('@srv/controllers/note.controller')

const app = express()

app.get('/ping', (req, res) => {
    res.send('pong')
})

app
    .use(require('morgan')('combined'))
    .use(require('cookie-parser')())
    .use(require('body-parser').json())
    .use(require('express-session')({secret: 'ULTRPD', resave: false, saveUninitialized: false}))

authPlugin(app)

app
    .use(NotebookController.router)
    .use(NoteController.router)
    .use(errorHandlerMiddleware)

app.listen(3000)
