'use strict';

module.exports = function artstationUserService(service) {
  return {
    postLike: (username, publication) => service.postLike(username, publication),
    followAuthor: (username, publication) => service.followAuthor(username, publication)
  };
};