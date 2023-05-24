const {User} = require('../models');

const userData = [
    {
        username: "Leyla",
        password: "test1"
    },

    {
        username: "Hammad",
        password: 'test2'
    },
    {
        username: "Timmy",
        password: "demoGod"
    }
]

const seedUsers = () => User.buldCreate(userData);

module.exports = seedUsers;