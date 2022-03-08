'use strict';

const likeRecentPubs = require('../../application/use-cases/artstation/likeRecentPublications.js');

module.exports = async function artstationController(dependencies) {
  const { count } = params;
  
  const likeRecentPublications = (count) => {
    const params = { count };
    try {
      return await likeRecentPubs(params, dependencies);
    } catch (err) {
      console.error(`Error happend!`, err)
    }
  }

  return {
    likeRecentPublications
  };
};