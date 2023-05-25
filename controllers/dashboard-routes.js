

// // path to get to the routes located at home screen

const sequelize = require('../config/connections'); // to access the connection of mysql host

const { Post, User, Comment } = require('../models')

const withAuth = require('../utils/auth');

const router = require('express').Router();

router.get('/', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id

        },
        attributes: [
            'id',
            'title',
            'content',
            "created_at"
        ],

        include: [
            {
                model: Comment,
                attributes: ['id', "comment_text", "post_id", "user_id", "created_at"],
                include: {
                    model: User, // check this part!!!
                    attributes: ['username']

                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]


    })
        .then(dbPostData => {
            // // we will display each post on the home

            const posts = dbPostData.map(post => post.get({ plain: true }));

            res.render('dashboard', { posts, loggedIn: true })
        })
        .catch(err => {
            console.log("Display the error if any", err)
            res.status(500).json(err)
        })
})


// // authentication path
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']

                }
            }
        ]
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'no post for this specific user'})
            return;
        }
        // serialize
        const post = dbPostData.get({plain: true});
        res.render('edit-post', {post, loggedIn: true});
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