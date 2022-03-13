'use strict';

module.exports = function artstationFollowingsApiSetup({
  webClient,
  logService
}) {
  return async function artstationFollowingsApi(username) {
    try {
      return await webClient.fetch({
        protocol: 'https:',
        hostname: 'www.artstation.com',
        path: `/users/${username}/following.json`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      logService.error({ err }, 'Artstation API Following: Error!');
    }
  };
};
