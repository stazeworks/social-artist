

'use strict';

module.exports = function artstationUserApiSetup({
  webClient,
  sessionRepository,
  logService
}) {
  return async function artstationUserApiMethod(
    username
  ) {
    const session = sessionRepository.findByUsername(username);

    const options = {
      method: 'GET',
      protocol: 'https:',
      hostname: 'www.artstation.com',
      path: '/api/v2/auth/user_data.json',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const response = await webClient.fetch(options);

      sessionRepository.create(username, {
        ...session,
        csrfToken: response.body.csrf_token
      });

      return response.body;
    } catch (err) {
      logService.error({ err }, 'Artstation: User API processing error!');
    }
  };
};
