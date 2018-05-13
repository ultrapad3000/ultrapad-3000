const db = require('./db');
const authPlugin = require('./auth');
const express = require('express');

const app = express();


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

app.listen(3000, () => console.log('PORT 3000'));
