'use strict';

module.exports = function sessionRepository() {
  const storage = new Map();
  return {
    create: (username, session) => storage.set(username, session),
    findByUsername: (username) => storage.has(username) ? storage.get(username) : undefined,
    deleteByUsername: (username) => storage.has(username) ? storage.delete(username) : undefined
  };
};