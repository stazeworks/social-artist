'use strict';

const Publication = require('../../../entities/artstation/publication');

module.exports = function artstationPostLikeLatestPublicationsAndFollowAuthorSetup({
  publicationRepository,
  artstationUserService
}) {
  return async function artstationPostLikeLatestPublicationsAndFollowAuthor(username, count) {
    const recentPublications = await publicationRepository.findOnLatestPage(username);

    if (count > recentPublications.length )
      throw new Error(`Count number (${count}) is higher than publications per page (${recentPublications.length})!`);

    const actionReport = {
      liked: [],
      followed: []
    };

    for (let i = 0; i < count; i++) {
      const artstationPublication = recentPublications.data[i];
      const publication = Publication(artstationPublication.id, artstationPublication.user.id);
      const postedLike = await artstationUserService.postLike(username, publication);
      actionReport.liked.push({
        like_id: postedLike.id,
        publication_id: postedLike.votable_id,
        like_created_at: postedLike.created_at
      });
      const followedAuthor = await artstationUserService.followAuthor(username, publication);
      actionReport.followed.push({
        follow_id: followedAuthor.id,
        followee_id: followedAuthor.followee_id,
        follow_created_at: followedAuthor.created_at,
        follow_updated_at: followedAuthor.updated_at
      });
    }
    return actionReport;
  };
};