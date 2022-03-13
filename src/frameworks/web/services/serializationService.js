'use strict';

module.exports = function serialization({ logService }) {
  const toJSON = (x) => {
    try {
      return JSON.parse(x);
    } catch (e) {
      logService.error({ err: e });
      return x;
    }
  };
  
  const toString = (x) => {
    try {
      return JSON.stringify(x, null, 2);
    } catch (e) {
      logService.error({ err: e });
      const err = new Error('Serialization: Error occurred while processing stringify!');
      err.cause = e;
      throw err;
    }
  };
  
  return {
    toJSON,
    toString
  };
};