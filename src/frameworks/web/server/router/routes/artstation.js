'use strict';

const artstationController = require('../../../../../adapters/controllers/artstationWebController');

const publicationRepositoryInterface = require('../../../../../application/repositories/artstation/publication');
const publicationRepositoryImpl = require('../../../../artstation/repositories/publicationRepository');
const artstationUserServiceInterface = require('../../../../../application/services/artstation/user');
const artstationUserServiceImpl = require('../../../../artstation/services/userService');

module.exports = function artstationRouteSetup({
  clientResponseService,
  sessionRepository,
  logService,
  webClient
}) {
  return function artstationRoute() {
    
    const artstation = artstationController({
      publicationRepositoryInterface,
      publicationRepositoryImpl,
      artstationUserServiceInterface,
      artstationUserServiceImpl,
      clientResponseService,
      sessionRepository,
      logService,
      webClient
    });
    
    return {
      '/artstation/likeLatestPublicationsAndFollowAuthor': (query) => artstation.postPublicationLikeAndFollowAuthor(query),
      '/artstation/login': (query) => artstation.login(query)
    };
  };
};
