'use strict';

const Q = require('q'),
    Version = require('./../models/version');

let updateVersion = {

    'execute': function (data) {

        let defered = Q.defer();

        Version.findOne({ appId: data.appId, hardwareId: data.hardwareId }, function (err, version) {
            if (err||!version)
              version = new Version(data);
            else
              version.addHistory();

            version.setVersion(data.version);
            version.setStatus(data.status);
            version.save(function(err, version) {
                if (err) defered.reject(err);
                else defered.resolve(version);
            });
        });

        return defered.promise;
    }
};

module.exports = updateVersion;
