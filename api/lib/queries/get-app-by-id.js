'use strict';

const Q = require('q'),
  App = require('./../models/app');
  
let apps = {};  

let getAppById = {

      'execute': function (id) {

          let defered = Q.defer();
          
          if ( apps[id] ) return defered.resolve(apps[id]);
          
          App.findById(id, function (err, data) {
              if (err||!data) return defered.reject(err);
              apps[id] = data;
              defered.resolve(data);
          });

          return defered.promise;
      }
};

module.exports = getAppById;