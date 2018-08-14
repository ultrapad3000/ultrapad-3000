const db = require('./db');
const authPlugin = require('./auth');
const express = require('express');

const app = express();

const NotebookController = require('./controllers/notebook.controller')
const NoteController = require('./controllers/note.controller')

app.get('/ping', (req, res) => {
  res.send('pong');
})

app
  .use(require('morgan')('combined'))
  .use(require('cookie-parser')())
  .use(require('body-parser').json())
  .use(require('express-session')({ secret: 'ULTRPD', resave: false, saveUninitialized: false }));

authPlugin(app);



app.get('/', (req, res) => res.json({hello: 'world'}))

app.use(NotebookController.router)
app.use(NoteController.router)

app.listen(3000, () => console.log('PORT 3000'));
