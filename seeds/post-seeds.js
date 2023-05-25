const { Post } = require('../models');

const postData = [
  {
    title: 'Games',
    content: 'Resident Evil 7',
    user_id: 1
    
  },
  {
    title: 'Sports',
    content: 'Boxing, Table Tennis',
    user_id: 2
  },
  {
    title: 'Discipline',
    content: 'Kung fu and Yoga',
    user_id: 3
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;