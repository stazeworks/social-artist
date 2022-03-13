'use strict';

module.exports = function webServerListenerSetup({
  router,
  urlQueryService,
  serializationService,
  clientResponseService,
  logService
}) {
  return async function webServerListener(req, res) {
    const { headers, url } = req;
    const requestedUrl = `http://${headers.host + url}`;
    try {
      clientResponseService.setCurrentResponse(res);
      const query = urlQueryService.parseParams(requestedUrl);
      const route = router[query.pathname];
      if (typeof route !== 'function') return clientResponseService.respondAsNotFoundError();
      const result = await route(query.searchParams);
      const data = serializationService.toString(result);
      if (data) res.write(data);
    } catch (err) {
      logService.error({ err }, 'WebServer: Error occurred while processing request!');
      clientResponseService.respondAsInternalServerError();
    } finally {
      res.end();
      clientResponseService.removeCurrentResponse(res);
    }
  };
};
  