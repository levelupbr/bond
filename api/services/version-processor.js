"use strict";

const subscriber = require('../infraestructure/queue-manager').subscriber,
    log = require('npmlog'),
    downgradeVersion = require('../lib/commands/downgrade-version'),
    updateVersion = require('../lib/commands/update-version'),
    postSave = require('../lib/commands/triggers/post-save');

let versionProcessor = function() {
    subscriber.on("message", function (data) {

        let message = JSON.parse(data);
        let command = message.action === 'downgrade' ? downgradeVersion : updateVersion;

        log.info('0MQ', 'Processing message at %s', message.date);

        command.execute(message.versionInfo)
            .then(function(version) {
                postSave.execute(version);
            })
            .catch(function(err) {
                log.error('0MQ','error on %s', data);
            });
    });
};

module.exports = versionProcessor;
