'use strict';

module.exports = async function artistService(service) {
  const add = () => service.add();
  const countAll = () => service.countAll();
  
  const follow = () => service.follow();
  const unfollowAll = () => service.countAll();
  const countAllFollows = () => service.countAllFollows();
  
  return {
    add,
    countAll,
    follow,
    unfollowAll,
    countAllFollows
  };
};