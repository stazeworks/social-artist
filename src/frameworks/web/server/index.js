'use strict';

module.exports = function webServer({
  protocol,
  listener
}) {
  const start = (port) => protocol
    .createServer(listener)
    .listen(port);

  return {
    start
  };
};
  