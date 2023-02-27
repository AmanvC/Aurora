const express = require('express');
const db = require('./config/mongoose');
const User = require('./models/user');
const app = express();
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const passportFacebook = require('./config/passport-facebook-strategy');
const expressLayouts = require('express-ejs-layouts');

const port = 8000;

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

const MongoStore = require('connect-mongo')(session);

app.use(session({
    name: 'Aurora',
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    }, (err) => {
        console.log(`Error in storing cookie in MongoStore: ${err}`);
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

const sassMiddleware = require('node-sass-middleware');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    // debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

app.use(express.static('assets'));

app.listen(port, (err) => {
    if(err){
        console.log(`Error occured in starting the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
})