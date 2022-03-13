'use strict';

module.exports = function likeSetup({
  webClient,
  sessionRepository,
  logService
}) {
  return async function artstationDeleteVoteApiMethod(
    username,
    votable_id,
    votable_type
  ) {
    const session = sessionRepository.findByUsername(username);

    const options = {
      method: 'DELETE',
      protocol: 'https:',
      hostname: 'www.artstation.com',
      path: '/votes.json',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': session ? session.cookies : undefined
      }
    };

    const postData = new URLSearchParams({
      type: 'like',
      votable_id,
      votable_type,
      source: 'direct'
    });

    try {
      const response = await webClient.fetch(options, postData);
      return response.body;
    } catch (err) {
      logService.error({ err }, 'Artstation: Delete Vote API processing error!');
    }
  };
};