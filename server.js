'use strict';

const
  environment = process.env.NODE_ENV || 'development',
  log = require('npmlog'),
  config = require('./api/configs/' + environment),
  app = require('./api/infraestructure/app'),
  apps = require('./api/routes/apps')(),
  versions = require('./api/routes/versions')(),
  versionProcessor = require('./api/services/version-processor')();

/*
if(environment == 'development'){
  const express = require('express');
  var appRoot = __dirname;

  app.use(express.static('./app/'));

  app.get('*', function(request, response, next) {
    response.sendFile(appRoot + '/app/index.html');
  });    
}
*/

let server = app.listen(process.env.PORT|| 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  log.info('Express','Versions app listening at http://%s:%s', host, port);
});