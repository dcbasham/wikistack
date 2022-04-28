const express = require('express')
const morgan = require("morgan");
const {db, Page, User} = require('./models/index');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/users');

const app = express();
// To use body parsing middleware
app.use(express.urlencoded({ extended: false }));
// To use morgan
app.use(morgan("dev"));
// To use express.static middleware
app.use(express.static(__dirname + "/public"));

const layout = require('./views/layout')

db.authenticate()
  .then(() => {
    console.log('Connected to the database');
  })

app.use('/wiki', wikiRouter);

app.get('/', (req, res, next) => {
  try {
    res.send(layout(''));
  } catch (error) {
    next(error);
  }
})

const init = async () => {
  await db.sync({force: true});

  app.listen(3000, () => {
    console.log(`Server is listening on port 3000!`);
  });
}

init();
