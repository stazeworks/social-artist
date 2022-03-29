'use strict';

module.exports = function artstationUserService(service) {
  return {
    postLike: (username, publication) => service.postLike(username, publication),
    deleteLike: (username, publication) => service.deleteLike(username, publication),
    followAuthor: (username, publication) => service.followAuthor(username, publication),
    unfollowAuthor: (username, publication) => service.unfollowAuthor(username, publication)
  };
};