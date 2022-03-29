'use strict';

const Publication = require('../../../entities/artstation/publication');
const Artist = require('../../../entities/artstation/artist');

module.exports = function artstationUnlikeAndUnfollowAllSetup({
  publicationRepository,
  artistRepository,
  artstationUserService
}) {
  return async function artstationUnlikeAndUnfollowAll(username) {
    const allLikedPublications = await publicationRepository.findAllOnLikedPage(username);
    for (const likedPublication of allLikedPublications) {
      const publication = Publication(likedPublication.id, likedPublication.user.id);
      await artstationUserService.deleteLike(publication);
    }

    const allFollowedArtist = await artistRepository.findAllOnFollowedPage(username);
    for (const followedArtist of allFollowedArtist) {
      const artist = Artist(followedArtist.id);
      await artstationUserService.deleteLike(artist);
    }

  };
};