'use strict';

const artstationApi = require('../../artstation/api');

module.exports = function artstationUserService({
  webClient,
  sessionRepository,
  logService
}) {
  const artstation = artstationApi({ webClient, sessionRepository, logService });

  const postLike = async (username, publication) => {
    return await artstation.postVote(username, publication.getId());
  };

  const followAuthor = async (username, publication) => {
    return await artstation.followAuthor(username, publication.getAuthorId());
  };

  return {
    postLike,
    followAuthor
  };
};