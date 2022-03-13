'use strict';

const artstationApi = require('../../../frameworks/artstation/api');

module.exports = function artstationLoginSetup({
  webClient,
  sessionRepository,
  logService
}) {
  const artstation = artstationApi({ webClient, sessionRepository, logService });
  return async function artstationLogin({
    username,
    email,
    password
  }) {
    const data = await artstation.login({ username, email, password });
    await artstation.getCsrfToken(username);
    await artstation.getUserData(username);
    return !!data;
  };
};