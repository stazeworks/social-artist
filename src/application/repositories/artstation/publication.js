'use strict';

module.exports = function publicationRepository(repository) {
  return {
    findAllOnLikedPage: (username) => repository.findAllOnLikedPage(username),
    findOnLatestPage: (username, count) => repository.findOnLatestPage(username, count),
  };
};