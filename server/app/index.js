const Koa = require('koa');
const app = new Koa();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(null, null, null, {
  host: 'localhost',
  dialect: 'sqlite',

  storage: '../../db.sqlite3',
  operatorsAliases: false
});

const User = sequelize.define('user', {
  email: Sequelize.STRING,
  password:Sequelize.STRING,
  display_name:Sequelize.STRING,
});
const Notebook = sequelize.define('notebook', {
  name:Sequelize.STRING,
  color:Sequelize.STRING,
})
const Note = sequelize.define('note', {
  name:Sequelize.STRING,
  content:Sequelize.STRING,
})
User.hasMany(Notebook);
Notebook.hasMany(Note);

sequelize.sync()
  .then(() => User.create({
    email: 'jdjdjd',
    password:"ddddd",
    display_name:'dddd'
  }))
  .then(hel => {
    console.log(hel.toJSON());
  });

app.use(async ctx => {
  const answer =  await User.findAll().then(hellows => {
    return JSON.stringify(hellows);
  })
  ctx.body = answer;
});

app.listen(3000);