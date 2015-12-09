'use strict';

const Q = require('q'),
  App = require('./../models/app');

let getAppById = {

      'execute': function (id) {

          let defered = Q.defer();
          App.findById(id, function (err, data) {
              if (err||!data) return defered.reject(err);
              defered.resolve(data);
          });

          return defered.promise;
      }
};

module.exports = getAppById;