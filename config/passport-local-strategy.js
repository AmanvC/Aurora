const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy(
    {usernameField: 'email'}, (email, password, done) => {
        User.findOne({email: email}, (err, user) => {
            if(err){
                console.log(`Error in Passport Authentication: ${err}`);
                return done(err);
            }
            if(!user || user.password != password){
                console.log(`Invalid credentials`);
                return done(null, false);
            }
            return done(null, user);
        })
    }
));

//key to be kept in cookies
passport.serializeUser((user, done) => {
    done(null, user.id);
});

//key checked to establish identity
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        if(err){
            console.log(`Error in finding user with request id: ${err}`);
            return done(err);
        }
        return done(null, user);
    })
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;