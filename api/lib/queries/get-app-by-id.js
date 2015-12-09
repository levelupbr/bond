'use strict';

const Q = require('q'),
  App = require('./../models/app');
  
let apps = {};  

let resolve = function(id, defered) {

    if ( apps[id] ) return defered.resolve(apps[id]);

    App.findById(id, function (err, data) {
        if (err||!data) return defered.reject(err);
        apps[id] = data;
        defered.resolve(data);
    });
}

let getAppById = {

      'execute': function (id) {
          let defered = Q.defer();
          resolve(id, defered);
          return defered.promise;
      }
};

module.exports = getAppById;