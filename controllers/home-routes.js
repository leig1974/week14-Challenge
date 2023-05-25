

// // path to get to the routes located at home screen

const sequelize = require('../config/connections'); // to access the connection of mysql host

const { Post, User, Comment } = require('../models')

const router = require('express').Router();

router.get('/', (req, res) => {
    Post.findAll({
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

            res.render('homepage', { posts, loggedIn: req.session.loggedIn })
        })
        .catch(err => {
            console.log("Display the error if any", err)
            res.status(500).json(err)
        })
})


// // authentication path
router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }

    // // take the user to the login page
    res.render('login')
});

// take the user to the signup screen
router.get('/signup', (req, res) => {
    res.render('signup');
})

// display each post

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
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
        if(!dbPostData){
            // converting the message into the json template
            res.status(404).json({message: "There is no post available for this specific user"})
            return;
        }

        // serealize
        const post = dbPostData.get({ plain: true });

        // accepted data on front end
        res.render('single-post', {post, loggedIn: req.session.loggedIn });
    })

    .catch(err => {
        res.status(500).json(err);
    })
})


// navigating the users to see their specific posts
router.get('/posts-comments', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment, 
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
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
        if(!dbPostData){
            res.status(404).json({message: "No post of this specific id"});
            return;
        }

        // serialize
        const post = dbPostData.get({plain: true});

        res.render('posts-comments', {post, loggedIn: req.session.loggedIn});

    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;