'use strict';

const http = require('node:http');

const webServerSetup = require('./src/frameworks/webserver');
const webServer = webServerSetup({ transport: http });
