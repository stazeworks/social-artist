'use strict';

module.exports = async function publicationService(service) {
  const add = () => service.add();
  const countAll = () => service.countAll();
  
  const like = (publications) => service.like(publications);
  const unlikeAll = () => service.likeAll();
  const countAllLikes = () => service.countAllLikes();
  
  return {
    add,
    countAll,
    like,
    unlikeAll,
    countAllLikes
  };
};