'use strict';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const { expect } = chai;

const config = require('../../config');

const loginArtstationSetup = require('../../src/application/services/artstation/login');

const postPublicationLikeAndFollowAuthorSetup =
  require('../../src/application/use-cases/artstation/postPublicationLikeAndFollowAuthor');

const publicationRepositoryInterface = require('../../src/application/repositories/artstation/publication');
const publicationRepositoryImpl = require('../../src/frameworks/artstation/repositories/publicationRepository');
const artstationUserServiceInterface = require('../../src/application/services/artstation/user');
const artstationUserServiceImpl = require('../../src/frameworks/artstation/services/userService');

const http = require('node:http');
const https = require('node:https');

const logService = require('../../src/frameworks/services/logService')();
const sessionRepository = require('../../src/frameworks/repositories/sessionRepository')();
const serializationService = require('../../src/frameworks/web/services/serializationService')({ logService });
const webClient = require('../../src/frameworks/web/client')({ http, https, logService, serializationService });

describe('Social Artist System: Artstation', () => {
  let loginArtstation;
  let postPublicationLikeAndFollowAuthorUseCase;

  beforeEach(() => {
    const publicationRepository = publicationRepositoryInterface(
      publicationRepositoryImpl({ webClient, sessionRepository, logService })
    );
    const artstationUserService = artstationUserServiceInterface(
      artstationUserServiceImpl({ webClient, sessionRepository, logService })
    );
    loginArtstation = loginArtstationSetup({
      webClient,
      sessionRepository,
      logService
    });
    postPublicationLikeAndFollowAuthorUseCase = postPublicationLikeAndFollowAuthorSetup({
      publicationRepository,
      artstationUserService
    });
  });

  context('Use case: get 1 latest publications and post like for each', () => {
    it('success', async () => {
      const hasLogged = await loginArtstation({
        username: config.artstation.username,
        email: config.artstation.email,
        password: config.artstation.password
      });

      expect(hasLogged).to.be.true;

      const result = await postPublicationLikeAndFollowAuthorUseCase(
        config.artstation.username,
        1
      );

      // TODO: [!] Write proper expectations!
      expect(result).to.have.all.keys('liked', 'followed');
      expect(result.liked[0].like_id).to.be.a('number');
      expect(result.followed[0].follow_id).to.be.a('number');
    });
  });


});