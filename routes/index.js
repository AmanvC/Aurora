const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/', usersController.login);
router.post('/create-session', passport.authenticate('local', {failureRedirect: '/'}), usersController.createSession);
router.get('/sign-up', usersController.signUp);
router.post('/create-user', usersController.createUser);
router.get('/home', passport.checkAuthentication, usersController.home);
router.get('/logout', usersController.logout);
router.get('/verify', usersController.verify);
router.get('/confirm/:confirmationCode', usersController.verifyUser);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), usersController.createSession);

router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/'}), usersController.createSession);

router.use('/questions', passport.checkAuthentication, require('./questions'));
router.use('/comments', passport.checkAuthentication, require('./comments'));
router.use('/profile', passport.checkAuthentication, require('./profile'));

module.exports = router;