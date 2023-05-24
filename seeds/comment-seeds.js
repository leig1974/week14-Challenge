// const sequelize = require('../config/connection');
// const { User } = require('../models');

// const userData = require('./userData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   process.exit(0);
// };

// seedDatabase();


const {Comment} = require('../models')

const commendData = [
  {
    comment_text: "Cool",
    user_id: 1,
    post_id: 1
  },

  {
    comment_text: "Good to learn this",
    user_id: 2,
    post_id: 2
  },
  {
    comment_text: "Awesome",
    user_id: 3,
    post_id: 3
  }
]

const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;