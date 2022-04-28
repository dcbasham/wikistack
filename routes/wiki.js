const express = require('express');

const wikiRouter = express.Router();

module.exports = wikiRouter;

wikiRouter.get('/', (req, res, next) => {
    res.send('got to GET /wiki/');
})
wikiRouter.post('/', (req, res, next) => {
    res.send('got to GET /wiki/');
});
wikiRouter.get("/add", (req, res, next) => {
    res.send('got to GET /wiki/add');
});