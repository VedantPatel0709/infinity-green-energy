const express = require('express');
const router = express.Router();

// Import controllers
const { registerUser, authUser } = require('../controllers/userController');

/**
 * User Routes
 */

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', authUser);

module.exports = router;