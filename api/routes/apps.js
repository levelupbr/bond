'use strict';

const app = require('../infraestructure/app'),
    createApp = require('../lib/commands/create-app'),
    getAppStatsById = require('../lib/queries/get-app-stats-by-id'),
    getApps = require('../lib/queries/get-apps');

let apps = function() {

  app.post('/api/apps/', function(req, res){

    let data = req.body;

    createApp.execute(data)
        .then(function(resp) {
            res.status(202).json({
                'message': 'created', app: resp
            });
        })
        .catch(function(err) {
            return res.status(400).json(err);
        });

  });

  app.get('/api/apps/:id/stats', function(req, res) {

    let q = req.query.q || false;

    getAppStatsById.execute(req.params.id, q)
        .then(function(resp) {
            res.status(200).json(resp);
        })
        .catch(function(err) {
            return res.status(400).json(err);
        });

  });

  app.get('/api/apps/', function(req, res) {

    getApps.execute()
        .then(function(resp) {
            res.status(200).json(resp);
        })
        .catch(function(err) {
            return res.status(400).json(err);
        });

  });
};

module.exports = apps;
