'use strict';

module.exports = function artstationLoginApiSetup({
  webClient,
  sessionRepository,
  logService
}) {
  return async function artstationLoginApi({
    username,
    email,
    password
  }) {
    const options = {
      protocol: 'https:',
      hostname: 'www.artstation.com',
      path: '/api/v2/authentication/session/login.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://www.artstation.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
      }
    };

    const postData = new URLSearchParams({
      email,
      password
    }).toString();

    const { headers, body } = await webClient.fetch(options, postData);
    if (body.error) {
      const err = new Error('Artstation: Login API respond error!');
      err.message = body.error;
      throw err;
    }

    sessionRepository.create(username, {
      session_token: body.session_token,
      artstation_user_id: body['current_user_id'],
      cookies: headers['set-cookie']
    });

    return body;
  };
};
