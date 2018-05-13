const Koa = require('koa');
const app = new Koa();
const db = require('./db');

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
