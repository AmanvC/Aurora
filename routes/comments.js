const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy')

const commentsController = require('../controllers/comments_controller');

router.post('/create', commentsController.create);
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports = router;