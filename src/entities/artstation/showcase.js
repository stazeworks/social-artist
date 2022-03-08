'use strict';

module.exports = async function showcase(publications) { 
  if (!Array.isArray(publications)) throw new Error(`Publications must be an array!`);
  return {
   getPublications: () => publications
  };
};