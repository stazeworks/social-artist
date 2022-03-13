'use strict';

module.exports = function urlQueryService({ urlParser }) {
  return {
    parseParams: (url) => urlParser(url)
  };
};
  