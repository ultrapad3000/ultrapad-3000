require('module-alias/register')

const express = require('express')

const authPlugin = require('@srv/auth')

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

app.get('/', (req, res) => res.json({hello: 'world'}))

app.use(NotebookController.router)
app.use(NoteController.router)

app.listen(3000)
