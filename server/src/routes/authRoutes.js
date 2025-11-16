const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

router.post('/register', validateRequest.register, authController.register);
router.post('/login', validateRequest.login, authController.login);
router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;

