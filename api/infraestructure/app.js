'use strict';
const 	cors = require('cors'),
		app = require('express')(),
    	bodyParser = require('body-parser');

let corsOptions = {
  origin: 'http://localhost:3000'
};

// parse application/json
app.use(bodyParser.json());
// CORS
app.use(cors(corsOptions));

app.get('/', function (req, res) {
    res.json('I\'m working...');
});

module.exports = app;