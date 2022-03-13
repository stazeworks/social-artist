'use strict';

module.exports = function publication(id, authorId) {
  return {
    getId: () => id,
    getAuthorId: () => authorId,
  };
};