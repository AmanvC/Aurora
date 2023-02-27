const passport = require('passport');
const facebookStrategy = require('passport-facebook');
const crypto = require('crypto');
const User = require('../models/user');
const keys = require('../keys/keys.json');

passport.use(new facebookStrategy(
    {
        clientID: keys.facebookClientID,
        clientSecret: keys.facebookClientSecret,
        callbackURL: "http://localhost:8000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done){
        console.log(profile);
        User.findOne({email: profile.id}, function(err, user){
            if(err){
                console.log(`Error is logging in through facebook: ${err}`);
                return done(err);
            }
            if(user){
                return done(null, user);
            }else{
                User.create({
                    name: profile.displayName,
                    email: profile.id,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log(`Error in creating user: ${err}`);
                        return;
                    }
                    return done(null, user);
                })
            }
        })
    }
));

module.exports = passport;