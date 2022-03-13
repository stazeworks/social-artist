'use strict';

module.exports = function artstationLatestApiSetup({
  webClient,
  sessionRepository,
  logService
}) {
  return async function artstationLatestApiMethod({
    username,
    page = 1,
    dimension = '3d',
    perPage = 30
  }) {
    const session = sessionRepository.findByUsername(username);

    const options = {
      method: 'GET',
      protocol: 'https:',
      hostname: 'www.artstation.com',
      path: `/api/v2/community/explore/projects/latest.json?page=${page}&dimension=${dimension}&per_page=${perPage}`,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': session ? session.cookies : ''
      }
    };
    const { body } = await webClient.fetch(options);
    if (body.error) {
      const err = new Error('Artstation: Login API respond error!');
      err.message = body.error;
      throw err;
    }
    return body;
  };
};
