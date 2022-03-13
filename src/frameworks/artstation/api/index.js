'use strict';

module.exports = function artstationWebApi(dependencies) {
  const apiFunctions = {
    'login': require('./login'),
    'getUserData': require('./user'),
    'getCsrfToken': require('./csrf'),
    'getLatestPublications': require('./latest'),
    'postVote': require('./votes/post'),
    'followAuthor': require('./followings/post')
  };

  const methods = {};
  for (const [name, fn] of Object.entries(apiFunctions)) {
    methods[name] = fn(dependencies);
  }
  return methods;
};