'use strict';

module.exports = function publicationRepository(repository) {
  return {
    add: (publication) => repository.add(publication),
    findById: (id) => repository.findById(id),
    findOnLatestPage: (username, count) => repository.findOnLatestPage(username, count),
    removeById: (id) => repository.removeById(id),
    countAll: () => repository.countAll()
  };
};