const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');
const questionsController = require('../controllers/questions_controller');

router.post('/post', questionsController.post);
router.get('/destroy/:id', passport.checkAuthentication, questionsController.destroy);

module.exports = router;