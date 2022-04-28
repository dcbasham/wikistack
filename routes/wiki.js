const express = require('express');
const addPageHtml = require('../views/addPage')
const wikiRouter = express.Router();

module.exports = wikiRouter;

wikiRouter.get('/', (req, res, next) => {
    res.send('got to GET /wiki/');
})
// wikiRouter.post('/', (req, res, next) => {
//     res.json(req.body);
// });
wikiRouter.get("/add", (req, res, next) => {
    res.send(`${addPageHtml()}`);
});
const { Page } = require("../models");
const { addPage } = require("../views");

wikiRouter.post('/', async (req, res, next) => {

    // STUDENT ASSIGNMENT:
    // add definitions for `title` and `content`
    const title = req.body.title
    const content = req.body.pageContent

    try {
        const page = await Page.create({
            title: title,
            content: content,
        });

        // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
        res.redirect('/');
    } catch (error) { next(error) }
});
