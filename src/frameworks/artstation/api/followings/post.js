'use strict';

const signatureGenerator = require('../clientCsrfTokenGenerator');

module.exports = function artstationFollowingsApiSetup({
  webClient,
  sessionRepository,
  logService
}) {
  return async function artstationFollowingsApiMethod(
    username,
    authorId
  ) {
    const session = sessionRepository.findByUsername(username);
    if (!session) throw new Error('Artstation API: Unauthorized');
    const timestamp = Math.round(Date.now() / 1000);

    const options = {
      method: 'POST',
      protocol: 'https:',
      hostname: 'www.artstation.com',
      path: '/followings.json',
      headers: {
        'Origin': 'https://www.artstation.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Cookie': session ? session.cookies : '',
        'Public-Csrf-Token': session ? session.publicCsrfToken : '',
        'X-As-Timestamp': timestamp,
        'X-As-Signature': session ? signatureGenerator(timestamp, session.csrfToken) : '',
        'X-Csrf-Token': session ? session.csrfToken : '',
      }
    };

    const postData = new URLSearchParams({
      followee_id: authorId,
      source: 'channel_latest'
    }).toString();

    const { body } = await webClient.fetch(options, postData);
    if (body.error) {
      const err = new Error('Artstation: Following API respond error!');
      err.message = body.error;
      throw err;
    }
    return body;
  };
};
