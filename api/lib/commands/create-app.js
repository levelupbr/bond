'use strict';

const App = require('./../models/app'),
    Q = require('q');

let createApp = {

    'execute': function (data) {
        
        let defered = Q.defer();
        let app = new App(data);
        
        app.save(function(err, app) {
            if (err) defered.reject(err);
            else defered.resolve(app);
        });
        
        return defered.promise;
    }
};
    
module.exports = createApp;