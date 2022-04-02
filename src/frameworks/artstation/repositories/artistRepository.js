'use strict';

const artstationApi = require('../api');

module.exports = function artistRepository({
  webClient,
  sessionRepository,
  logService
}) {
  const artstation = artstationApi({ webClient, sessionRepository, logService });

  const findAllOnLikedPage = async () => {
    let result;
    let currentPage = 1;
    const publicationsPerPage = 50;
    const { data, total_count } = await artstation.getVotesPerPage(currentPage);
    const totalPagesCount = Math.round(total_count / publicationsPerPage);
    result = [...data];
    for (let currentPage = 1; currentPage <= totalPagesCount; currentPage++) {
      const { data } = await artstation.getVotesPerPage(currentPage);
      result = [...result, ...data];
    }
    return result;
  };

  const findOnLatestPage = async () => {
    
  };
  
  return {
    findOnLatestPage,
    findAllOnLikedPage,
  };
};
