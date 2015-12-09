'use strict';

const app = require('express')(),
    bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.json('I\'m working...');
});

module.exports = app;