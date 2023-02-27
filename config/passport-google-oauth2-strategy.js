const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const keys = require('../keys/keys.json');

passport.use(new googleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "http://localhost:8000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        // console.log(profile);
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log(`Error in google authentication: ${err}`);
                return done(err);
            }
            if(user){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log(`Error in creating user through google authentication: ${err}`);
                        return;
                    }
                    return done(null, user);
                })
            }
        })
    }
));

module.exports = passport;