'use strict';

const app = require('../infraestructure/app'),
    createApp = require('../lib/commands/create-app'),
    getAppStatsById = require('../lib/queries/get-app-stats-by-id'),
    getApps = require('../lib/queries/get-apps');

let parseQuery = function(query) {
  let q = query || false;
  if ( ! q || q.indexOf(',') === -1 ) return q;

  try {
    return JSON.parse(q);
  } catch (e) {
    console.log(e);
    return false;
  }

};

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

    require('fs').appendFile('req-log.txt', 'oi', function(err){});

    let q = parseQuery(req.query.q);

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
