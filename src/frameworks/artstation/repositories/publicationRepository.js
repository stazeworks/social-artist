'use strict';

const artstationApi = require('../api');

module.exports = function artstationPublicationRepository({
  webClient,
  sessionRepository,
  logService
}) {
  const artstation = artstationApi({ webClient, sessionRepository, logService });

  const findOnLatestPage = async (username) => {
    return await artstation.getLatestPublications({ username });
  };

  return {
    findOnLatestPage,
  };
};