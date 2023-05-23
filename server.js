const express = require('express')

const routes = require('./controllers')
const sequelize = require('./config/connections')

const path = required('path')
const helpers = require('./utils/helpers')

const exphbs = require('express-handlebars')

const hbs = exphbs.create({helpers});

// session connection to sequelize the database

const session = require('express-session')

const app = express();

const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);


// // creating a session to begin

const sess = {
    secret: 'super secret',
    cookie: {maxAge: 36000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })

}

app.use(session(sess));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')))


// set Handlebars as the default template engine

app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

// turn on routes

app.use(routes);

// turn on connection to db and server

sequelize.synx({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"))
})
