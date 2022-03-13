'use strict';

const signatureGenerator = require('../clientCsrfTokenGenerator');

module.exports = function artstationPostVoteApiSetup({
  webClient,
  sessionRepository,
  logService
}) {
  return async function artstationPostVoteApiMethod(
    username,
    votable_id,
    votable_type = 'Project'
  ) {
    const session = sessionRepository.findByUsername(username);
    if (!session) throw new Error('Artstation API: Unauthorized');
    const timestamp = Math.round(Date.now() / 1000);

    const options = {
      method: 'POST',
      protocol: 'https:',
      hostname: 'www.artstation.com',
      path: '/votes.json',
      headers: {
        'Origin': 'https://www.artstation.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Cookie': session ? session.cookies : '',
        'Public-Csrf-Token': session ? session.publicCsrfToken : '',
        'X-As-Timestamp': timestamp,
        'X-As-Signature': session ? signatureGenerator(timestamp, session.csrfToken) : '',
        'X-Csrf-Token': session ? session.csrfToken : ''
      }
    };

    const postData = new URLSearchParams({
      type: 'like',
      votable_id,
      votable_type,
      source: 'direct'
    }).toString();

    const { body } = await webClient.fetch(options, postData);
    if (body.error) {
      const err = new Error('Artstation: Post Vote API respond error!');
      err.message = body.error;
      throw err;
    }
    return body;
  };
};