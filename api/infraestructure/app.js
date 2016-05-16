'use strict';
const 	cors = require('cors'),
		app = require('express')(),
    	bodyParser = require('body-parser');

let corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.json('I\'m working...');
});

module.exports = app;