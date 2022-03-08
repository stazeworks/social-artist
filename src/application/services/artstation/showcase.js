'use strict';

module.exports = async function showcaseService(service) {
  const loadRecentPublications = (url) => service.loadRecentPublications();
  
  return {
    loadRecentPublications
  };
};