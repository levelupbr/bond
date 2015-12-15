'use strict';

const app = require('express')(),
  	cors = require('cors'),
    bodyParser = require('body-parser');

let corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(bodyParser.json());

app.use(cors(corsOptions));

app.get('/', function (req, res) {
    res.json('I\'m working...');
});

module.exports = app;