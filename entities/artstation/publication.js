'use strict';

module.exports = async function publication(url) {
  return {
    getUrl: () => url,
  };
};