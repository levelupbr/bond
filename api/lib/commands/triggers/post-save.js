'use strict';

const Q = require('q'),
  request = require('request');

let triggers = {
  '56684ca0522e0584ee067e1a' : {
    execute: function(defered, version) {

      if (!version.succeeded) return defered.resolve(version);

      request.post('http://lugpatchapi.levelup.com.br/states/warface/success', {"hardwareId": version.hardwareId });

      let options = {
        body: {
          'hardwareId': 'version.hardwareId'
        },
        json: true,
        headers: {
          'marinet-appid' : '5626727a6eefd01c0fceba83',
          'marinet-appkey' : 'f7b6b36c3b2d3057911974df6655943eb43e4d4bd9bfd45bc87b9448f137d4ac'
        }
      };

      request.del('http://http://marinet.levelup.com.br/error', options);
      defered.resolve(version);
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
