const express = require('express')
const morgan = require("morgan");

const app = express();
// To use body parsing middleware
app.use(express.urlencoded({ extended: false }));
// To use morgan
app.use(morgan("dev"));
// To use express.static middleware
app.use(express.static(__dirname + "/public"));

const { db } = require('./models');
const layout = require('./views/layout')

db.authenticate()
  .then(() => {
    console.log('Connected to the database');
  })

app.get('/', (req, res, next) => {
  try {
    res.send(layout(''));
  } catch (error) {
    next(error);
  }
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
