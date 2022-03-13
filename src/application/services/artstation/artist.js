'use strict';

module.exports = async function artistService(repository) {
  return {
    add: (artist) => repository.add(artist),
    findById: (id) => repository.findById(id),
    removeById: (id) => repository.removeById(id),
    countAll: () => repository.countAll()
  };
};