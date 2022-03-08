'use strict';

const listenerSetup = require('./listener');

module.exports = function webServer(dependencies) {
  const { transport } = dependencies;
  
  const listener = listenerSetup();
  
  const start = (port) => {
    return transport
            .createServer(listener)
            .listen(port);
  };
  
  return {
    start
  };
};
  