'use strict';

const Q = require('q'),
    Version = require('./../models/version');

let updateVersion = {

    'execute': function (data) {

        let defered = Q.defer();
        //console.log(Version);
        Version.findOne({ appId: data.appId, hardwareId: data.hardwareId }, function (err, version) {
            if (err||!version) version = new Version(data);
            
            /*version.setVersion(data.version);
            version.status = data.status;
            version.save(function(err, version) {
                if (err) defered.reject(err);
                else*/ defered.resolve(version);
            //});
        });
        
        return defered.promise;
    }
};
 
module.exports = updateVersion;
