'use strict';

module.exports = async function artist(url) {
  return {
    getUrl: () => url,
  };
};