'use strict';

const Q = require('q'),
  request = require('request');

let triggers = {
  '56684ca0522e0584ee067e1a' : {
    execute: function(defered, version) {

      if (!version.succeeded) return defered.resolve(version);

      request.post('http://localhost:9010/states/warface/success', { body: {"hardwareId": version.hardwareId }, json: true }, function(){

        let options = {
          body: {
            'hardwareId': version.hardwareId
          },
          json: true,
          headers: {
            'marinet-appid' : '5626727a6eefd01c0fceba83',
            'marinet-appkey' : 'f7b6b36c3b2d3057911974df6655943eb43e4d4bd9bfd45bc87b9448f137d4ac'
          }
        };

        request.del('http://localhost:3000/error', options, function() {
          defered.resolve(version);
        });

      });

    }
  },
  'default' : {
    execute: function(defered, version) {
      defered.resolve(version);
    }
  }
}

let postSave = {

    'execute': function (version) {

        let defered = Q.defer();

        let trigger = triggers[version.appId]||triggers.default;
        trigger.execute(defered, version);

        return defered.promise;
    }
};

module.exports = postSave;
