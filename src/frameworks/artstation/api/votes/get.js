'use strict';

module.exports = function artstationGetVotesApiSetup({
  webClient,
  sessionRepository,
  logService
}) {
  return async function artstationGetVotesApiMethod(
    username,
    email,
    user_id,
    page,
  ) {
    const session = sessionRepository.findByUsername(username);
    user_id = session.artstation_user_id ? session.artstation_user_id : user_id;

    const options = {
      method: 'GET',
      protocol: 'https:',
      hostname: 'www.artstation.com',
      path: `/users/${username}/likes.json?page=${page}&user_id=${user_id}`,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': session ? session.cookies : undefined
      }
    };

    try {
      const response = await webClient.fetch(options);
      return response.body;
    } catch (err) {
      logService.error({ err }, 'Artstation: Get Votes API processing error!');
    }
  };
};
