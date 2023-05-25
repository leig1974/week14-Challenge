

// // path to get to the routes located at home screen


const { Comment } = require('../models')

const withAuth = require('../utils/auth');

const router = require('express').Router();

router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log("Display the error if any", err)
            res.status(500).json(err)
        })
});


// // authentication path
router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        },
      
    })
    .then(dbPostData => {
     
    })
    .catch(err => {
        res.status(500).json(err)
    })

});

// take the user to the signup screen
router.get('/signup', (req, res) => {
    res.render('signup');
})

// redirect the users to the signin page once they have registered them selves

router.get('/new', (req, res) => {
    res.render('new-post');
})

module.exports = router