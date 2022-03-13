'use strict';

const postPublicationLikeAndFollowAuthorSetup = require('../../application/use-cases/artstation/postPublicationLikeAndFollowAuthor.js');
const loginArtstationSetup = require('../../application/services/artstation/login.js');

module.exports = function artstationController({
  publicationRepositoryInterface,
  publicationRepositoryImpl,
  artstationUserServiceInterface,
  artstationUserServiceImpl,
  clientResponseService,
  webClient,
  sessionRepository,
  logService
}) {
  const publicationRepository = publicationRepositoryInterface(
    publicationRepositoryImpl({ webClient, sessionRepository, logService })
  );
  const artstationUserService = artstationUserServiceInterface(
    artstationUserServiceImpl({ webClient, sessionRepository, logService })
  );

  const loginArtstation = loginArtstationSetup({ webClient, sessionRepository, logService });
  const postLikeAndFollowAuthor = postPublicationLikeAndFollowAuthorSetup({
    publicationRepository,
    artstationUserService
  });

  const login = async (query) => {
    const username = query.get('username');
    const email = query.get('email');
    const password = query.get('password');
    try {
      return await loginArtstation({ username, email, password });
    } catch (err) {
      logService.error({ err }, 'Use case loginArtstation processing error occurred!');
      return clientResponseService.respondAsInternalServerError();
    }
  };

  const postPublicationLikeAndFollowAuthor = async (query) => {
    const username = query.get('username');
    const count = query.get('count');
    try {
      return await postLikeAndFollowAuthor(username, count);
    } catch (err) {
      logService.error({ err }, 'Use case postPublicationLikeAndFollowAuthor processing error occurred!');
      return clientResponseService.respondAsInternalServerError();
    }
  };

  return {
    login,
    postPublicationLikeAndFollowAuthor
  };
};