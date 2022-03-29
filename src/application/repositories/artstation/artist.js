'use strict';

module.exports = async function artistRepository(repository) {
  return {
    findAllOnFollowedPage: (username) => repository.findAllOnFollowedPage(username),
  };
};