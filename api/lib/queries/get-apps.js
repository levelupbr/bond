'use strict';

const Q = require('q'),
  App = require('./../models/app');
  
let getApps = {
    
    'execute': function (id) {
    
        let defered = Q.defer();
        
        App.find({}, function (err, data) {
            if (err||!data) return defered.reject(err);
            defered.resolve(data);
        });
        
        return defered.promise;
      }
};

module.exports = getApps;