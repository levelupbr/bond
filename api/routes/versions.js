'use strict';

const app = require('../infraestructure/app.js'),
    publisher = require('../infraestructure/queue-manager.js').publisher,
    getAppById = require('../lib/queries/get-app-by-id');

const actions =  ['open', 'success', 'downgrade', 'repair', 'try-connect', 'closed'];

let isValidAction = function(action) {
    return (actions.indexOf(action) !== -1);
};

let version = function() {

    app.post('/api/version/', function(req, res) {

        let data = req.body,
            action = data.action,
            appId = data['app-id'];

        if ( ! isValidAction(action) )
            return res.status(400).json({ 'message': action + ' isn\'t a valid action'});

        getAppById.execute(appId)
            .then(function(){
                publisher.send(JSON.stringify({
                    'action': action,
                    'versionInfo': { 
                        'appId': appId, 
                        'hardwareId': data['hardware-id'], 
                        'version': data.version, 
                        'osVersion': data.osVersion !== undefined ? unescape(data.osVersion) : '',
                        'dotnetVersions': data.dotnetVersions !== undefined ? unescape(data.dotnetVersions) : '',
                        'status': data.action, 
                        'data': data.data || {}, 
                        'ip':  req.headers['x-real-ip'] || req.connection.remoteAddress },
                    'date': new Date()
                }));

                res.status(201).json({
                    'message': 'queued'
                });
            })
            .catch(function() {
                return res.status(400).json({ 'message': appId + ' isn\'t a valid app'});
        });
    });
};

module.exports = version;