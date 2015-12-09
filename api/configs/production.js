'use strict';

var mongoose = require('mongoose');

let config = {
    server: '10.20.1.29',
    port: '27017',
    database: 'bondlog'
};

let connectionString = 'mongodb://' + config.server + ':' + config.port + '/' + config.database;
    
mongoose.connect(connectionString, function(err) {
    if (err) throw err;
});