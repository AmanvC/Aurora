const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile_controller.js');

router.get('/:id', profileController.profile);
router.post('/update', profileController.update);

module.exports = router;