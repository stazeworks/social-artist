

'use strict';

module.exports = function artstationGetPublicCsrfTokenApiSetup({
  webClient,
  sessionRepository,
  logService
}) {
  return async function artstationGetPublicCsrfTokenApiMethod(
    username
  ) {
    const session = sessionRepository.findByUsername(username);

    const options = {
      method: 'POST',
      protocol: 'https:',
      hostname: 'www.artstation.com',
      path: '/api/v2/csrf_protection/token.json',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': session ? session.cookies : undefined
      }
    };

    const postData = new URLSearchParams({
      create_csrf_token_request: true
    }).toString();

    try {
      const response = await webClient.fetch(options, postData);

      sessionRepository.create(username, {
        ...session,
        cookies: [ ...session.cookies, ...response.headers['set-cookie'] ],
        publicCsrfToken: response.body.public_csrf_token
      });

      return response.body;
    } catch (err) {
      logService.error({ err }, 'Artstation: CSRF API processing error!');
    }
  };
};