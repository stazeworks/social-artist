'use strict';

const artstationRoutesSetup = require('./routes/artstation');

module.exports = function webServerRouter({
  clientResponseService,
  sessionRepository,
  logService,
  webClient
}) {
  const artstationRoutes = artstationRoutesSetup({
    clientResponseService,
    sessionRepository,
    logService,
    webClient
  });

  return {
    '/': 'Root',
    ...artstationRoutes()
  };
};
  