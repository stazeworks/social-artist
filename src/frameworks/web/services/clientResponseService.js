'use strict';

module.exports = function clientResponseService() {
  let currentResponse;

  const setHeaders = () => {
    currentResponse.setHeader('Content-Type', 'application/json');
  };

  const setCurrentResponse = (res) => currentResponse = res;
  const removeCurrentResponse = () => currentResponse = undefined;
  const respondAsInternalServerError = () => {
    setHeaders();
    currentResponse.statusCode = 500;
    currentResponse.write('Internal Server Error');
  };
  const respondAsNotFoundError = () => {
    setHeaders();
    currentResponse.statusCode = 404;
    currentResponse.write('Not Found');
  };

  return {
    setCurrentResponse,
    removeCurrentResponse,
    respondAsNotFoundError,
    respondAsInternalServerError
  };
};
