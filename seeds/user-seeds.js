const { User } = require('../models');

const userData = [
  {
    username: 'Daffy',
    password: 'test1'

  },
  {
    username: 'Leyla',
    password: 'test2'
  },
  {
    username: 'Indiana Jhones',
    password: 'demoGod'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;