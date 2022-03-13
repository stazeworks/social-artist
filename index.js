'use strict';

const config = require('./config');

const http = require('node:http');
const https = require('node:https');

const logService = require('./src/frameworks/services/logService')();
const clientResponseService = require('./src/frameworks/web/services/clientResponseService')();
const serializationService = require('./src/frameworks/web/services/serializationService')({ logService });

const urlQueryService = require('./src/frameworks/web/services/urlQueryService')({ urlParser: (url) => new URL(url) });
const webClient = require('./src/frameworks/web/client')({ http, https, logService, serializationService });
const sessionRepository = require('./src/frameworks/repositories/sessionRepository')();

const router = require('./src/frameworks/web/server/router')({
  clientResponseService,
  sessionRepository,
  logService,
  webClient
});

const webServerListener = require('./src/frameworks/web/server/listener')({
  router,
  urlQueryService,
  serializationService,
  clientResponseService,
  logService
});

const webServer = require('./src/frameworks/web/server')({
  protocol: http,
  listener: webServerListener
});

(async () => {
  await webServer.start(config.webServerPort);
})();
