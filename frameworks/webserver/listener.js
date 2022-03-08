'use strict';

module.exports = function webServerListenerSetup({
  webAuth,
  urlQuery,
  router,
  serialization,
  clientResponse,
  logger
}) {
  return function webServerListener(req, res) {
    const {} = req;
    try {
      const hasValidated = webAuth.validate(req, res, clientResponse);
      const query = urlQuery(req);
      const route = router();
      res.write = route(query);
    } catch (e) {
      logger.error({ err: e }, `WebServer: Error occurred while processing request!`);
      res.write = clientResponse.respondAsInternalServerError();
    } finally {
      res.end();
    }
  };
}
  