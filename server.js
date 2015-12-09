'use strict';

const
  environment = process.env.NODE_ENV || 'development',
  log = require('npmlog'),
  config = require('./api/configs/' + environment),
  app = require('./api/infraestructure/app'),
  apps = require('./api/routes/apps')(),
  versions = require('./api/routes/versions')(),
  versionProcessor = require('./api/services/version-processor')();

let server = app.listen(process.env.PORT|| 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  log.info('Express','Versions app listening at http://%s:%s', host, port);
});