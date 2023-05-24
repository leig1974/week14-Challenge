const seedUsers = require('./user-seeds');

const seedPosts = require('./post-seeds')
const seedComments = require('./comment-seeds');


const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({force: true});
    console.log("DB Synced")
    await seedUsers();
    console.log("Users seeded");
    await seedPosts();
    console.log("Posts seeded");
    await seedComments();
    console.log("Comments seeded")

    // // this will exit the seeding processing, seeding means that we are adding the data in the database directly
    process.exit(0);
}

// // call back for the main function that will start the process
seedAll();