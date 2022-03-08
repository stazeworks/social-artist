'use strict';

module.exports = async function artstationLikeRecentPublications(params, dependencies) {
  const { count } = params;
  const { showcaseService, artistService } = dependencies;
  
  const recentPublications = await showcaseService.loadRecentPublications(count);
  const report = [];
  for (const publication in recentPublications) {
    const status = await artistService.like(publication);
    report.push(status);
  }
  
  return report;
};